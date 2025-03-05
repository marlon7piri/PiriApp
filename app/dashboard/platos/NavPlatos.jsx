"use client";
import React from "react";
import styles from "@/app/dashboard/productos/styles.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Boton from "@/app/components/Boton";
import FiltroBusqueda from "@/app/components/FiltroBusqueda";

const NavPlatos = () => {
  return (
    <div
      className={`flex  items-center gap-4 bg-slate-50 shadow-2xl p-4 rounded-md mt-8 mb-8 ${styles.containerSearch}`}
    >
      <div className={styles.btncontainer}>
        <div className="h-12 flex justify-center ">
          <FiltroBusqueda />
        </div>
        <div>
          <Boton texto="Nuevo" href="/dashboard/platos/new" />
        </div>
      </div>
    </div>
  );
};

export default NavPlatos;
