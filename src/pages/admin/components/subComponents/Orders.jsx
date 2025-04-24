import React from 'react'
import { Button } from '../../../../components'
function Orders() {
  return (
    <>
      <div className='rounded-lg h-full w-full grid grid-cols-1 grid-rows-[auto_1fr] '>

        <div className='p-4 bg-gray-800 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold'>Orders</h2>
          <p>Manage your orders here.</p>
        </div>
        <div className='p-4 bg-gray-800 rounded-lg shadow-md mt-4 overflow-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-700'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Order ID</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Customer Name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Status</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Total Amount</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>View Details</th>
              </tr>
            </thead>
            <tbody className='bg-gray-800 divide-y divide-gray-600'>
              {/* Sample data, replace with actual data */}
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>#{index + 1}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>Customer {index + 1}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-green-400'>Shipped</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>$100.00</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'><Button children={'Details'} bgColor='bg-blue-500' /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Orders