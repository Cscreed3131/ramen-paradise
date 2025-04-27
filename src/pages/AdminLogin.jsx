import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signin as adminSignin } from '../features/adminSlice';
import authService from '../firebase/AuthService';
import adminService from '../firebase/AdminService';

export default function AdminLogin() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const [error, setError] = React.useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const adminAuth = useSelector(state => state.admin);
  
  const from = location.state?.from || '/admin/dashboard';
  
  useEffect(() => {
    if (adminAuth.status) {
      navigate(from, { replace: true });
    }
  }, [adminAuth.status, navigate, from]);
  
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const userId = await authService.getCurrentUserId();
        
        if (userId) {
          const adminData = await adminService.getAdminUserData(userId);
          
          if (adminData) {
            dispatch(adminSignin({
              adminId: userId,
              adminName: adminData.name || adminData.displayName,
              adminEmail: adminData.email,
              adminPermissions: adminData.permissions || {
                READ: true,
                WRITE: true,
                DELETE: true,
                UPDATE: true
              }
            }));
          }
        }
      } catch (error) {
        console.error("Error checking admin authentication:", error);
      }
    };
    
    checkAdminAuth();
  }, [dispatch]);
  
  const onSubmit = async (data) => {
    setError(null);
    
    try {
      const user = await authService.signin({
        email: data.email,
        password: data.password
      });
      
      const adminData = await adminService.getAdminUserData(user.uid);
      
      if (!adminData) {
        // If no admin record is found, throw an error
        await authService.signout(); // Sign out the non-admin user
        throw new Error('You do not have admin access');
      }
      
      // Dispatch admin data to Redux
      dispatch(adminSignin({
        adminId: user.uid,
        adminName: adminData.name || adminData.displayName || user.displayName,
        adminEmail: adminData.email || user.email,
        adminPermissions: adminData.permissions || {
          READ: true,
          WRITE: true,
          DELETE: true,
          UPDATE: true
        }
      }));
      
      // Save admin session to localStorage for persistence
      localStorage.setItem('adminAuth', JSON.stringify({
        adminId: user.uid,
        timestamp: Date.now()
      }));
      
      // Navigate to the admin dashboard
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      console.error('Login error:', err);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center text-white font-bold text-2xl">
              R
            </div>
          </Link>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
            Admin Portal
          </span>
        </div>
        
        {/* Card */}
        <div className="backdrop-blur-sm bg-gray-900/40 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">Admin Login</h1>
              <p className="text-gray-400 mt-2">
                Sign in to access the admin dashboard
              </p>
            </div>
            
            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  autoComplete="email"
                  className={`w-full bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                  placeholder="admin@ramenparadise.com"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className={`w-full bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                Sign in
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <Link to="/" className="text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}