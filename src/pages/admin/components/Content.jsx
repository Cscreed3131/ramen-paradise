import React from 'react'
import Dashboard from './subComponents/Dashboard'

function Content({activeItem}) {
  return (
    <div className='flex flex-col'>
        { activeItem === 'Dashboard' && <Dashboard />}
        {
          activeItem === 'Settings' && (
            <div className='p-4 bg-gray-800 rounded-lg shadow-md'>
              <h2 className='text-2xl font-bold'>Settings</h2>
              <p>Manage your settings here.</p>
            </div>
          )
        }
        {
          activeItem === 'Profile' && (
            <div className='p-4 bg-gray-800 rounded-lg shadow-md'>
              <h2 className='text-2xl font-bold'>Profile</h2>
              <p>View and edit your profile here.</p>
            </div>
          )
        }
    </div>
  )
}

export default Content