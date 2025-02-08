'use client'

import Boton from "@/app/components/Boton";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce'
import React from "react";
import BotonEXCEL from "@/app/components/BotonEXCEL";
import { useClientContext } from "@/app/context/ClientProvider";
import BotonPDF from "@/app/components/BotonPDF";
import UploadExcel from "@/app/components/UploadExcel ";

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

    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className="flex justify-evenly gap-4 bg-slate-50 shadow-2xl p-4 rounded-md mt-8">
      <input
        type="text"
        onChange={handlerSearch}
        className="outline-none p-2  h-16 border-slate-900 rounded-md focus:border-sky-500"
        placeholder="Buscar...."
      />
      <div>
      <UploadExcel />
      </div>
      
      <div className="flex gap-4">
      
        <BotonEXCEL productos={productos} />
        <BotonPDF productos={productos} />
        <Boton texto="Nuevo" href="/dashboard/productos/new" />
      </div>
    </div>
  );
};

export default NavProductos;
