"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import styles from "@/app/dashboard/productos/styles.module.css";
import BotonComponent from "@/app/components/BotonComponent";
import Boton from "@/app/components/Boton";
import FiltroBusqueda from "@/app/components/FiltroBusqueda";

const FiltrosRecetas = () => {
  return (
    <div
      className={`flex justify-between gap-4 bg-slate-50 shadow-2xl p-4 rounded-md mt-8 mb-8 ${styles.containerSearch}`}
    >
      <div className="h-12 flex justify-center ">
        <FiltroBusqueda />
      </div>
      <div>
        <Boton texto="Nuevo" href="/dashboard/recetas/new" />
      </div>
    </div>
  );
};

export default FiltrosRecetas;
