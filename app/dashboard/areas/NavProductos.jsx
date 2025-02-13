'use client'

import Boton from "@/app/components/Boton";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce'
import React from "react";
import UploadExcel from "@/app/components/UploadExcel ";
import styles from './styles.module.css'

const NavCategorias= ({ productos }) => {
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

    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className={`flex items-center gap-4 bg-slate-50 shadow-2xl p-4 rounded-md mt-8 ${styles.containerSearch}`}>
      <input
        type="text"
        onChange={handlerSearch}
        className="outline-none p-2  h-16 border-slate-900 rounded-md focus:border-sky-500"
        placeholder="Buscar...."
      />
       <Boton texto="Nueva" href="/dashboard/areas/new" />
      
     
    </div>
  );
};

export default NavCategorias;
