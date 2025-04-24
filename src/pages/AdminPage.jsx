import React, { useState } from 'react';
import SideBar from './admin/components/SideBar';
import Content from './admin/components/Content';
function AdminPage() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className='font-mono grid grid-cols-[1fr_4fr] text-white bg-black'>
      <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />
      {/* Main component of the page. */}
      <Content activeItem={activeItem} />
    </div>
  );
}

export default AdminPage;