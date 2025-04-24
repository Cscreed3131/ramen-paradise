import React, { useState } from 'react';
import SideBar from './admin/components/SideBar';
import { Outlet } from 'react-router-dom';

function AdminPage() {
  return (
    <div className='font-mono grid grid-cols-[1fr_4fr] text-white bg-black'>
      <SideBar />
      <Outlet />
    </div>
  );
}

export default AdminPage;