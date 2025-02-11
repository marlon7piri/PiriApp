import React from 'react'
import { getAllInventarios } from '@/app/libs/actions/inventarios/get-inventarios'
import TablaInventarios from './TablaInventarios'
import Filtros from './Filtros'
import { getServerSession } from 'next-auth'
import { authoptions } from '@/app/api/auth/[...nextauth]/route'




const Inventario = async ({ searchParams }) => {

  const session = await getServerSession(authoptions)
  const fecha = searchParams.fecha || ''
  const area = searchParams.area || ''
  const inventarios = await getAllInventarios(session?.user?.userId, fecha, area)


  return (
    <div>
      <Filtros

      />
      <TablaInventarios inventarios={inventarios} />
    </div>
  )
}

export default Inventario