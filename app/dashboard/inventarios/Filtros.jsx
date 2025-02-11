"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Filtros = () => {

  const searchparams = useSearchParams()
  const { replace } = useRouter()
  const path = usePathname()

  const [filtros, setFiltros] = useState({
    area: 'todos',
    fecha: ''
  })
  const filtrar = (e) => {
    setFiltros({ ...filtros, fecha: e.target.value })
  };

  const areafiltrada = (e) => {

    setFiltros({ ...filtros, area: e.target.value })


  };

  const filtrarQuery = () => {
    const params = new URLSearchParams(searchparams)


    if (filtros) {
      params.set('area', filtros.area)
      params.set('fecha', filtros.fecha)

    } else {
      params.delete('area')
      params.delete('fecha')

    }

    replace(`${path}?${params}`)

  }
  return (
    <div className="flex gap-2">
      <input
        type="date"
        onChange={filtrar}
        value={filtros.fecha}
        className="cursor-pointer"
      />
      <select onChange={(e) => areafiltrada(e)} value={filtros.area} className="cursor-pointer">
        <option value="todos">todos</option>
        <option value="cocina">cocina</option>
        <option value="barra">barra</option>
      </select>
   
      <button onClick={filtrarQuery} className="p-2 bg-sky-500 hover:bg-sky-900 transition duration-500 rounded-md">Filtrar</button>
    </div>
  );
};

export default Filtros;
