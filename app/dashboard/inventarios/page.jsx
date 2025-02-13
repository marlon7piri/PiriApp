import React from 'react'
import { getAllInventarios } from '@/app/libs/actions/inventarios/get-inventarios'
import TablaInventarios from './TablaInventarios'
import Filtros from './Filtros'
import { getServerSession } from 'next-auth'
import { authoptions } from '@/app/api/auth/[...nextauth]/route'
import { getAreas } from '@/app/libs/actions/areas/get-areas'




const Inventario = async ({ searchParams }) => {

  const session = await getServerSession(authoptions)
  const fecha = searchParams.fecha || ''
  const area = searchParams.area || ''
  const inventarios = await getAllInventarios(session?.user?.restaurante_id, fecha, area)
  const areas = await getAreas(session?.user?.restaurante_id);

  return (
    <div>
      <Filtros
        areas={areas}
      />
      <TablaInventarios inventarios={inventarios} fecha={fecha} />
    </div>
  )
}

export default Inventario