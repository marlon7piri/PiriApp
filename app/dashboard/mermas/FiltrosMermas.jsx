"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import styles from '@/app/dashboard/productos/styles.module.css'


const FiltrosMermas = () => {
  const [fecha, setFecha] = useState("");
  const { replace } = useRouter();
  const searchparams = useSearchParams()
  const path = usePathname()


  const Filtrar = () => {
    const params = new URLSearchParams(searchparams)
    if (fecha) {
      params.set('fecha', fecha)
    } else {
      params.delete('fecha')
    }

    replace(`${path}?${params}`)

  }

  const limpiar = () => {
    const params = new URLSearchParams(searchparams)

    params.delete('fecha')


    replace(`${path}?${params}`)


  }
  return (
    <div className={`flex gap-2 ${styles.containerSearch}`}>
      <input type="date" onChange={(e) => setFecha(e.target.value)} value={fecha} className="cursor-pointer" />
      <div>
        <button type="button" onClick={Filtrar} className="w-max ml-4 bg-sky-500  hover:bg-sky-900 px-4 py-2 rounded-sm">
          Filtrar
        </button>
        <button type="button" onClick={limpiar} className="w-max ml-4 bg-sky-500  hover:bg-sky-900 px-4 py-2 rounded-sm">
          Limpiar
        </button>
      </div>


    </div>
  );
};

export default FiltrosMermas;
