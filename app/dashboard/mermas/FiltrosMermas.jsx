"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import styles from "@/app/dashboard/productos/styles.module.css";
import BotonComponent from "@/app/components/BotonComponent";

const FiltrosMermas = () => {
  const [fecha, setFecha] = useState("");
  const { replace } = useRouter();
  const searchparams = useSearchParams();
  const path = usePathname();

  const Filtrar = () => {
    const params = new URLSearchParams(searchparams);
    if (fecha) {
      params.set("fecha", fecha);
    } else {
      params.delete("fecha");
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
      className={`flex items-center gap-4 bg-slate-50 shadow-2xl p-4 rounded-md mt-8 mb-8 ${styles.containerSearch}`}
    >
      <input
        type="date"
        onChange={(e) => setFecha(e.target.value)}
        value={fecha}
        className="cursor-pointer"
      />
      <div className="w-full flex  gap-2 lg:flex-row sm:flex-col md:flex-col  sm:justify-center md:justify-center ">
        <BotonComponent onClick={Filtrar} text="Filtrar" />
        <BotonComponent onClick={limpiar} text="Limpiar" />
      </div>
    </div>
  );
};

export default FiltrosMermas;
