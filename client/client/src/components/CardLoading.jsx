import React from 'react'

const CardLoading = () => {
  return (
    <div className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded bg-white animate-pulse'>
      <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded bg-gray-200'></div>
      <div className='flex items-center gap-1'>
        <div className='rounded text-xs w-fit p-[1px] px-2 bg-gray-200 h-4 w-12'></div>
        <div className='bg-gray-200 h-4 w-16 rounded'></div>
      </div>
      <div className='px-2 lg:px-0 h-4 bg-gray-200 rounded'></div>
      <div className='w-fit gap-1 px-2 lg:px-0 h-4 bg-gray-200 rounded w-16'></div>
      <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3'>
        <div className='flex items-center gap-1'>
          <div className='h-4 bg-gray-200 rounded w-16'></div>
        </div>
        <div className='h-6 bg-gray-200 rounded w-20'></div>
      </div>
    </div>
  )
}

export default CardLoading
