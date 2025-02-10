

import React from 'react'
import FormMermas from './FormMermas'
import { getAllProductos } from '@/app/libs/actions/productos/get-productos'

const Mermas = async ({ searchParams }) => {
  const q = searchParams.query || ""


  const productos = await getAllProductos(q)




  return (
    <div className='w-ful h-screen flex flex-col justify-center p-4 overflow-scroll'>
      <h1 className='text-center text-4xl'>Mermas</h1>
      <FormMermas productos={productos} />
    </div>
  )
}

export default Mermas