import React, { useState } from 'react'
import {Card,CardContent} from '../../../../components/index'

function Dashboard() {
  const [acitveCard, setAcitveCard] = useState(null)
  const cardItems = [
    {
      title: 'Orders',
      content: 'Content for Card 4',
      slug: 'orders',
      active: false
    },
    {
      title: 'Products',
      content: 'Content for Card 1',
      slug: 'products',
      active: false,
    },
    {
      title: 'Customers',
      content: 'Content for Card 3',
      slug: 'customers',
      active: false
    },
    
    {
      title: 'Resturtants',
      content: 'Content for Card 2',
      slug: 'resturants',
      active: false
    },
  ]

  return (
    <>
      <div className='p-4 m-4 my-4 bg-gray-800 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold'>Admin Dashboard</h2>
        <p>Welcome to the admin dashboard!</p>
      </div>
      
      <div className='p-4 mx-4 my-1 bg-gray-800 rounded-lg shadow-md grid grid-cols-4 gap-4 grid-rows-1 h-1/4'>
        {
          cardItems.map((item) => (
            <Card
              className='flex justify-center items-center bg-gray-400 rounded-lg shadow-md 
              hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out' 
              key={item.slug} children = {
              <CardContent children={
                <h2 className='text-2xl font-bold '>{item.title}</h2>
              }/>
            } onClick={()=> {
              console.log(item.slug)
            }}/>
          ))
        }
      </div>
    </>
  )
}

export default Dashboard