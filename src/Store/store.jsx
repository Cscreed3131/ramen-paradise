import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../features/authSlice';
import adminSlice from '../features/adminSlice';
import productsSlice from '../features/productSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        admin: adminSlice,
        products: productsSlice,
    },
});

export default store;