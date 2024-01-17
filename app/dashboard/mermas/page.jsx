import React from 'react'
import TablaMermas from './TablaMermas'
import NavProductos from '../productos/NavProductos'
import FiltrosMermas from './FiltrosMermas'

const Mermas = () => {
  return (
    <div className='w-full h-screen '>
      <div className='w-full h-full flex flex-col gap-4 p-4'>
      <h1 className="text-3xl font-bold text-center">Mermas</h1>
      <NavProductos/>
      <FiltrosMermas/>
      <TablaMermas/>
      </div>
    </div>
  )
}

export default Mermas