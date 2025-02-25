import { authoptions } from '@/app/api/auth/[...nextauth]/route'
import { getProveedores } from '@/app/libs/actions/proveedores/get-proveedor'
import { getServerSession } from 'next-auth'
import React from 'react'
import NavProveedor from './NavProveedor'
import TablaProveedores from './TablaProveedores'
import ShowEmptyComponent from '@/app/components/ShowEmptyComponent'

const page = async ({ searchParams }) => {
    const session = await getServerSession(authoptions)
    const query = searchParams.query || ''
    const proveedores = await getProveedores(session?.user?.restaurante_id, query)


    if(!proveedores){
        return <ShowEmptyComponent text={"No hay proveedores"} color='dark'/>
      }
    
  
    return (
        <div className="w-full ">
            <h1 className="text-center text-gray-900 font-bold text-2xl">Proveedores</h1>
            <NavProveedor />
            <TablaProveedores proveedores={proveedores} />
        </div>
    )
}

export default page
