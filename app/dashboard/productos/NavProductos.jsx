'use client'

import Boton from "@/app/components/Boton";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce'
import React from "react";
import UploadExcel from "@/app/components/UploadExcel ";
import styles from './styles.module.css'
import BotonEXCEL from "@/app/components/BotonEXCEL";
import BotonPDF from "@/app/components/BotonPDF";

const NavProductos = ({ productos }) => {
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlerSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchparams);

    if (e.target.value) {
      params.set("query", e.target.value);
    } else {
      params.delete("query");
    }

    params.set("page", 1)
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className={`flex justify-evenly gap-4 bg-slate-50 shadow-2xl p-4 rounded-md mt-8 overflow-scroll ${styles.containerSearch}`}>
      <input
        type="text"
        onChange={handlerSearch}
        className={styles.input_filters}
        placeholder="Buscar...."
      />
      <div className="w-full flex gap-2   items-center overflow-hidden ">
        <UploadExcel productos={productos} />
        
      </div>

      <div className={styles.containerDownloadProductos}>






        <Boton texto="Nuevo" href="/dashboard/productos/new" />
      </div>
    </div>
  );
};

export default NavProductos;
