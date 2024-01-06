'use client'

import React, { useState } from 'react'

const BusquedaProductos = ({tablaProductos,setProductos}) => {
const [terminobusqueda, setTerminobusqueda] = useState('')

    const handlerSearch =(e)=>{
        setTerminobusqueda(e.target.value)
        filtrar(e.target.value)
    }

    const filtrar =(terminobusqueda)=>{
        const result = tablaProductos.filter((producto)=>{
            if(producto.nombre.toString().toLowerCase().includes(terminobusqueda.toLowerCase())){
                return producto
            }
        })
        setProductos(result)

    }
  return (
    <nav className="flex justify-between bg-slate-50 shadow-2xl  rounded-md">
      <input
        type="text"
        onChange={handlerSearch}
        className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
        placeholder="Buscar...."
      />{" "}
    </nav>
  )
}

export default BusquedaProductos