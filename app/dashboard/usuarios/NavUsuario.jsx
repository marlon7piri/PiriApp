"use client";

import Boton from "@/app/components/Boton";
import {useDebouncedCallback} from 'use-debounce'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import styles from '@/app/dashboard/productos/styles.module.css'


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
    <div className={`flex gap-2 ${styles.containerSearch}`}>
      <input
        type="text"    onChange={handlerSearch} 
        className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
        placeholder="Buscar...."
      />{" "}
      <Boton texto="Nuevo" href='/dashboard/usuarios/new'/>
    
   
    </div>
  );
};

export default NavUsuario;
