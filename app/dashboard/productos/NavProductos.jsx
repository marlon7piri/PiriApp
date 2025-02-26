'use client'

import Boton from "@/app/components/Boton";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce'
import React from "react";
import UploadExcel from "@/app/components/UploadExcel ";
import styles from './styles.module.css'


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
    <div className={`flex justify-evenly   gap-4 bg-slate-50 shadow-2xl p-4 rounded-md mt-8  ${styles.containerSearch}`}>
      <input
        type="text"
        onChange={handlerSearch}
        className={styles.input_filters}
        placeholder="Buscar...."
      />
      <div className={`${styles.containerDownloadProductos}`}>
        <UploadExcel productos={productos} />
        
      </div>

      <div >






        <Boton texto="Nuevo" href="/dashboard/productos/new" />
      </div>
    </div>
  );
};

export default NavProductos;
