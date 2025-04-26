import React, { useEffect } from 'react';
import SideBar from './admin/components/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  // Check authentication and redirect if needed
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/auth-page');
  //   } else if (user && user.role !== 'admin') {
  //     navigate('/');
  //   }
  // }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-red-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-yellow-500 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
          <SideBar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;