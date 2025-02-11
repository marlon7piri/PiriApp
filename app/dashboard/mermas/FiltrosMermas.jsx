"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from '@/app/dashboard/productos/styles.module.css'


const FiltrosMermas = () => {
  const [fecha, setFecha] = useState("");
  const router = useRouter();


  return (
    <div className={`flex gap-2 ${styles.containerSearch}`}>
      <input type="date" onChange={(e) => setFecha(e.target.value)} value={fecha} className="cursor-pointer" />
      <div>
        <button type="submit" className="w-max ml-4 bg-sky-500  hover:bg-sky-900 px-4 py-2 rounded-sm">
          Filtrar
        </button>
        <button type="submit" className="w-max ml-4 bg-sky-500  hover:bg-sky-900 px-4 py-2 rounded-sm">
          Limpiar
        </button>
      </div>


    </div>
  );
};

export default FiltrosMermas;
