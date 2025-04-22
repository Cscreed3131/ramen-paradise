import React from 'react'

export default function RegisterBtn() {
  return (
    <button className='
    bg-red-700 
    text-white 
    border 
    rounded-2xl 
    px-6 py-2
    text-xl' 
    onClick={() => console.log('Register Button Clicked!')}>
      Register Now
    </button>
  )
}
