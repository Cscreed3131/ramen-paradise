import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/store'
import {AuthLayout} from './components/index.js'
import AuthPage from './pages/AuthPage'
import AdminPage from './pages/AdminPage'
import { 
  Dashboard,
  AddProduct,
  EditProduct, 
  ProductList,
  Products,
  Profile,
  RemoveProduct,
  Settings, 
  Orders,
  Customers,
  Restaurants} from './pages/admin/components/adminComponents.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
    ]
  },
  {
    path: '/auth-page',
    element: (
      <AuthLayout authentication={false}>
        <AuthPage />
      </AuthLayout>
    )
  },
  {
    path: '/admin',
    element: <AdminPage />,
    children:[
      {
        path: 'dashboard',
        element: <Dashboard />,
        children:[
          {
            path: 'products',
            element: <Products />,
          },
          {
            path: 'products/product-list',
            element: <ProductList />,
          }, 
          {
            path: 'products/add-product',
            element: <AddProduct />,
          }, 
          {
            path: 'products/remove-product',
            element: <RemoveProduct />
          },
          {
            path: 'products/edit-product',
            element: <EditProduct />
          },
          {
            path: 'products/Best-seller',
            element: <ProductList />
          },
          {
            path: 'orders',
            element: <Orders />,
          },
          {
            path: 'customers',
            element: <Customers />,
          },
          {
            path: 'restaurants',
            element: <Restaurants />,
          },
        ]
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      // {
      //   path: 'settings',
      //   element: <Settings />,
      //   children:[]
      // }
      // {
      //   path: 'profile',
      //   element: <Profile />,
      //   children:[]
      // }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
