import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productsService from '../firebase/ProductsService';

// Initial state
const initialState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Async thunks
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await productsService.getAllProducts();
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId, thunkAPI) => {
    try {
      return await productsService.getProductById(productId);
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, thunkAPI) => {
    try {
      const result = await productsService.addProduct(productData);
      // Get the full product data with the new ID
      const newProduct = { 
        id: result.productId,
        ...productData,
        image: typeof productData.image === 'string' 
          ? productData.image 
          : result.imageUrl || '',
      };
      return newProduct;
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ productId, updatedData }, thunkAPI) => {
    try {
      await productsService.updateProduct(productId, updatedData);
      return { id: productId, ...updatedData };
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (productId, thunkAPI) => {
    try {
      await productsService.deleteProduct(productId);
      return productId;
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    filterByCategory: (state, action) => {
      const category = action.payload;
      if (category === 'all') {
        // No filtering needed
        return;
      }
      // This doesn't mutate state directly since createSlice uses Immer
      state.filteredProducts = state.products.filter(
        product => product.category === category
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllProducts
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Handle createProduct
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Handle updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          // Update the product in the array
          state.products[index] = {
            ...state.products[index],
            ...action.payload,
          };
        }
        // If this is the currently selected product, update it as well
        if (state.selectedProduct && state.selectedProduct.id === action.payload.id) {
          state.selectedProduct = {
            ...state.selectedProduct,
            ...action.payload,
          };
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Handle deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        // If the deleted product was selected, clear selection
        if (state.selectedProduct && state.selectedProduct.id === action.payload) {
          state.selectedProduct = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Export actions and reducer
export const { 
  resetProductState, 
  setSelectedProduct, 
  clearSelectedProduct,
  filterByCategory 
} = productSlice.actions;

export default productSlice.reducer;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductById = (state, productId) => 
  state.products.products.find(product => product.id === productId);
export const selectFeaturedProducts = (state) => 
  state.products.products.filter(product => product.featured);
export const selectProductsByCategory = (state, category) => 
  category === 'all'
    ? state.products.products
    : state.products.products.filter(product => product.category === category);
export const selectProductsLoadingState = (state) => ({
  isLoading: state.products.isLoading,
  isSuccess: state.products.isSuccess,
  isError: state.products.isError,
  message: state.products.message
});