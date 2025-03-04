

import React from 'react'
import FormMermas from './FormMermas'
import { getAllProductos } from '@/app/libs/actions/productos/get-productos'
import { getServerSession } from 'next-auth'
import { authoptions } from '@/app/api/auth/[...nextauth]/route'

const Mermas = async ({ searchParams }) => {
  const q = searchParams.query || ""
  const allData = 'si';
  const session = await getServerSession(authoptions)
  const productos = await getAllProductos(q,session?.user?.restaurante_id,allData)




  return (
    <div className='w-full h-screen flex flex-col justify-center items-center p-4 '>
      
      <FormMermas productos={productos} />
    </div>
  )
}

export default Mermas