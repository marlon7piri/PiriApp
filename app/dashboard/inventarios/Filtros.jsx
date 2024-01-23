'use client'

import React from 'react'

const Filtros = ({obtenerFecha,fechaseleccionada}) => {

    const filtrar =(e)=>{
      obtenerFecha(e.target.value)
    }
  return (
    <div>
        <input type="date" onChange={filtrar} value={fechaseleccionada} className='cursor-pointer'/>
    </div>
  )
}

export default Filtros