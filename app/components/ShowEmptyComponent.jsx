import React from 'react'

const ShowEmptyComponent = ({text,color}) => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <h1 className={`${color ==='dark' ? 'text-slate-900' : 'text-slate-50'} text-4xl`}>{text}</h1>
    </div>
  )
}

export default ShowEmptyComponent
