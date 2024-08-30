import React from 'react'
import { BsSearch } from 'react-icons/bs'

const Suggestions = () => {
  return (
    <div className='w-full  h-full pl-7'>
      <div className='bg-hoverColor/40 w-full px-4 py-3 rounded-full flex items-center justify-center gap-3 mt-4'>
        <BsSearch className='text-hoverColor' />
        <input type="text" className='bg-transparent w-full border-none outline-none placeholder:text-hoverColor text-sm' placeholder='Search' />
      </div>

      <div className='mt-4 p-5 border border-hoverColor rounded-xl'>
        <h3 className='text-xl font-bold'>Subscribe to Premium</h3>
        <h4 className='text-xs my-4'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</h4>
        <button className='text-white bg-buttonColor px-8 py-2 rounded-full text-sm'>Subscribe</button>
      </div>
    </div>
  )
}

export default Suggestions