"use client";

import Boton from "@/app/components/Boton";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import React from "react";
import UploadExcel from "@/app/components/UploadExcel ";
import styles from "./styles.module.css";
import FiltroBusqueda from "@/app/components/FiltroBusqueda";

const NavProductos = ({ productos }) => {
  return (
    <div
      className={`flex justify-evenly   gap-x-2 bg-slate-50 shadow-2xl p-4 rounded-md mt-8  ${styles.containerSearch}`}
    >
      <div className="h-12 flex justify-center ">
        <FiltroBusqueda />
      </div>
      <div className={`${styles.containerDownloadProductos}`}>
        <UploadExcel productos={productos} />
      </div>

      <div>
        <Boton texto="Nuevo" href="/dashboard/productos/new" />
      </div>
    </div>
  );
};

export default NavProductos;
