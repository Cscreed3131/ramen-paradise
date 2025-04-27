import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminSidebar from './admin/components/SideBar';

export default function AdminPage() {

  const adminAuth = useSelector(state => state.admin);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!adminAuth.status) {
      navigate('/admin/login', { 
        replace: true,
        state: { from: location.pathname }
      });
    }
  }, [adminAuth.status, navigate, location]);
  
  if (!adminAuth.status) {
    return null;
  }
  
  return (
    <div className="flex h-screen bg-gray-900">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 bg-gray-800">
        <Outlet />
      </main>
    </div>
  );
}