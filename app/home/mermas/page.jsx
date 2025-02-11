

import React from 'react'
import FormMermas from './FormMermas'
import { getAllProductos } from '@/app/libs/actions/productos/get-productos'
import { getServerSession } from 'next-auth'
import { authoptions } from '@/app/api/auth/[...nextauth]/route'

const Mermas = async ({ searchParams }) => {
  const q = searchParams.query || ""

  const session = await getServerSession(authoptions)
  const productos = await getAllProductos(q,session?.user?.userId)




  return (
    <div className='w-ful h-screen flex flex-col justify-center p-4 overflow-scroll'>
      <h1 className='text-center text-4xl'>Mermas</h1>
      <FormMermas productos={productos} />
    </div>
  )
}

export default Mermas