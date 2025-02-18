"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import styles from '@/app/dashboard/productos/styles.module.css'

const Filtros = ({ areas }) => {

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

    if (filtros.fecha || filtros.area && filtros.area !== 'todos') {
      params.set('area', filtros.area)
      params.set('fecha', filtros.fecha)

    } else {
      params.delete('area')
      params.delete('fecha')

    }

    replace(`${path}?${params}`)

  }
  return (
    <div className={`flex items-center gap-4 bg-slate-50 shadow-2xl p-4 rounded-md mt-8 mb-8 ${styles.containerSearch}`}>
      <input
        type="date"
        onChange={filtrar}
        value={filtros.fecha}
        className="cursor-pointer"
      />
      <select onChange={(e) => areafiltrada(e)} value={filtros.area} className="cursor-pointer">

        <option value="todos">todos</option>

        {areas.map(t => {
          return <option value={t._id}>{t.nombre}</option>
        })}

      </select>

      <button onClick={filtrarQuery} className={styles.btnPrimary}>Filtrar</button>
    </div>
  );
};

export default Filtros;
