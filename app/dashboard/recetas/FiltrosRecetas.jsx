"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import styles from "@/app/dashboard/productos/styles.module.css";
import BotonComponent from "@/app/components/BotonComponent";
import Boton from "@/app/components/Boton";

const FiltrosRecetas = () => {
  const [fecha, setFecha] = useState("");
  const { replace } = useRouter();
  const searchparams = useSearchParams();
  const path = usePathname();

  const Filtrar = (e) => {
    const busqueda = e.target.value;
    const params = new URLSearchParams(searchparams);
    if (busqueda) {
      params.set("query", busqueda);
    } else {
      params.delete("query");
    }

    replace(`${path}?${params}`);
  };

  const limpiar = () => {
    const params = new URLSearchParams(searchparams);

    params.delete("fecha");

    replace(`${path}?${params}`);
  };
  return (
    <div
      className={`flex justify-between items-center gap-4 bg-slate-50 shadow-2xl p-4 rounded-md mt-8 mb-8 ${styles.containerSearch}`}
    >
      <input
        type="text"
        onChange={Filtrar}
        className={styles.input_filters}
        placeholder="Buscar...."
      />
      <div>
        <Boton texto="Nuevo" href="/dashboard/recetas/new" />
      </div>
    </div>
  );
};

export default FiltrosRecetas;
