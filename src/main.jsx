import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/store'
import {AuthLayout} from './components/index.js'
import AuthPage from './pages/AuthPage'
import AdminPage from './pages/AdminPage.jsx'

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
    path: '/admin-page',
    element: <AdminPage />,
    children:[]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
