import React, { useEffect } from 'react';
import SideBar from './admin/components/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminPage() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    console.log("authStatus", authStatus);
    if (!authStatus) {
      navigate('/auth-page');
    }
  }, [authStatus, navigate]);

  return (
    <div className='font-mono grid grid-cols-[1fr_4fr] text-white bg-black'>
      <SideBar />
      <Outlet />
    </div>
  );
}

export default AdminPage;