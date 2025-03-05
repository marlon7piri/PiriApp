"use client";

import Boton from "@/app/components/Boton";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import React from "react";
import styles from "@/app/dashboard/productos/styles.module.css";
import FiltroBusqueda from "@/app/components/FiltroBusqueda";

const NavProveedor = () => {
  return (
    <div
      className={`flex justify-between gap-4 bg-slate-50 shadow-2xl p-4 rounded-md mt-8 mb-8 ${styles.containerSearch}`}
    >
      <div className="h-12 flex justify-center ">
        <FiltroBusqueda />
      </div>
      <Boton texto="Nueva" href="/dashboard/proveedores/new" />
    </div>
  );
};

export default NavProveedor;
