

import React from 'react'
import FormMermas from './FormMermas'
import { getAllProductos } from '@/app/libs/actions/productos/get-productos'
import { getServerSession } from 'next-auth'
import { authoptions } from '@/app/api/auth/[...nextauth]/route'

const Mermas = async ({ searchParams }) => {
  const q = searchParams.query || ""
  const allData = 'si';
  const page = 1
  const session = await getServerSession(authoptions)
  const {allproducts,totalPage} = await getAllProductos(q,page,session?.user?.restaurante_id,allData)



  return (
    <div className='w-full h-screen flex flex-col justify-center items-center p-4 '>
      
      <FormMermas productos={allproducts} />
    </div>
  )
}

export default Mermas