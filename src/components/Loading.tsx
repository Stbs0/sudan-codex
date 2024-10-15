import SpinnerIcon from '@/assets/icons/SpinnerIcon'
import React from 'react'



const Loading = () => {
  return (
    <div className=' absolute top-0 left-0 h-full  w-full z-50 flex justify-center items-center bg-gray-800/80'><SpinnerIcon /></div>
  )
}

export default Loading