"use client";

import Boton from "@/app/components/Boton";
import {useDebouncedCallback} from 'use-debounce'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const NavUsuario = () => {
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
    <nav className="flex justify-between bg-slate-50 shadow-2xl p-4 rounded-md">
      <input
        type="text"    onChange={handlerSearch} 
        className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
        placeholder="Buscar...."
      />{" "}
      <Boton texto="Nuevo" href='/dashboard/usuarios/new'/>
    
    {/*   <Link
        href="/dashboard/usuarios/new"
        className="bg-slate-50 px-3 py-2 rounded text-slate-900"
      >
        New User
      </Link> */}
    </nav>
  );
};

export default NavUsuario;
