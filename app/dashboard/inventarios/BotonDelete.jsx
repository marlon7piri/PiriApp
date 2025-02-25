'use client'
import { useClientContext } from '@/app/context/ClientProvider'
import DeleteIcon from '@/app/icons/DeleteIcon'
import React from 'react'

const BotonDelete = ({id}) => {
    const { deleteInventario } = useClientContext()

   

    return <button onClick={() => deleteInventario(id)}
        className="p-2 h-8 rounded bg-red-500 font-medium text-slate-50   dark:text-slate-50 hover:bg-red-700 hover:cursor-pointer">




        <DeleteIcon />

    </button>
}

export default BotonDelete
