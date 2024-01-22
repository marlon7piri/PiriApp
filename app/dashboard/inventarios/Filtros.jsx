'use client'

import Inputs from '@/app/components/Inputs'
import React from 'react'

const Filtros = () => {

    const filtrar =()=>{
        alert("Filtrando inventarios por fechas")
    }
  return (
    <div>
        <Inputs onChange={filtrar}/>
    </div>
  )
}

export default Filtros