import { getAreas } from '@/app/libs/actions/areas/get-areas'
import { getAllProveedores } from '@/app/libs/actions/proveedores/get-proveedor'
import { getServerSession } from 'next-auth'
import React from 'react'
import FormEditProducto from './FormEditProducto'
import { authoptions } from '@/app/api/auth/[...nextauth]/route'

const page = async ({params}) => {
  const session = await getServerSession(authoptions)
  const areas = await getAreas(session?.user?.restaurante_id)

  const proveedores = await getAllProveedores(session?.user?.restaurante_id)

  return (
    <div>
      <FormEditProducto params={params} areas={areas} proveedores={proveedores}/>
    </div>
  )
}

export default page
