  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import { RouterProvider, createBrowserRouter } from 'react-router-dom'
  import App from './App.jsx'
  import { Provider } from 'react-redux'
  import store from './Store/store'
  import AdminPage from './pages/AdminPage'
  import AdminLogin from './pages/AdminLogin'
  import {
    Home,
    Menu,
    Services,
    Location,
  } from './components/index.js'
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
  import Offers from './components/Offers/Offers.jsx'
  import SignupPage from './pages/SignupPage.jsx'
  import SigninPage from './pages/SigninPage.jsx'
  import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
  import UserProfilePage from './pages/UserProfilePage.jsx'
import OrderPage from './pages/OrderPage.jsx'

  const router = createBrowserRouter([
    // Main public routes
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true, // Default route
          element: <Home />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'menu',
          element: <Menu />,
        },
        {
          path: 'services',
          element: <Services />,
        },
        {
          path: 'location',
          element: <Location />,
        },
        {
          path: 'offers',
          element: <Offers />,
        },
        
        
      ]
    },
    {
      path: 'order',
      element: <OrderPage />,
    },
    {
      path: 'user-profile',
      element: <UserProfilePage />,
    },
    {
      path: '/auth',
      children:[
        {
          path: 'signin',
          element: <SigninPage />
        },
        {
          path: 'signup',
          element: <SignupPage />
        },
        {
          path:'forgot-password',
          element: <ForgotPasswordPage />
        },
      ]
    },
    {
      path: '/admin',
      children: [
        {
          path: 'login',
          element: <AdminLogin />
        },
        {
          path: '',
          element: <AdminPage />,
          children: [
            {
              index: true, // Default admin route
              element: <Dashboard />
            },
            {
              path: 'dashboard',
              element: <Dashboard />
            },
            
            // OPTION 1: Flattened product routes (recommended for simplicity)
            {
              path: 'products',
              element: <Products />
            },
            {
              path: 'products/product-list',
              element: <ProductList />
            },
            {
              path: 'products/add-product',
              element: <AddProduct />
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
              path: 'products/best-sellers',
              element: <ProductList />
            },
            
            // Other main admin routes
            {
              path: 'orders',
              element: <Orders />
            },
            {
              path: 'customers',
              element: <Customers />
            },
            {
              path: 'restaurants',
              element: <Restaurants />
            },
            
            // Account-related routes
            {
              path: 'settings',
              element: <Settings />
            },
            {
              path: 'profile',
              element: <Profile />
            }
          ]
        }
      ]
    },
    
    // 404 route - catch all unmatched routes
    {
      path: '*',
      element: <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-6">The page you're looking for doesn't exist or has been moved.</p>
          <a href="/" className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-medium rounded-lg">
            Return to Homepage
          </a>
        </div>
      </div>
    }
  ])

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  )