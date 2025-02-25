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
    <div className={`flex justify-between items-center gap-4 bg-slate-50 shadow-2xl p-4 rounded-md mt-8 mb-8 ${styles.containerSearch}`}>
      <input
        type="text"    onChange={handlerSearch} 
        className={styles.input_filters}
        placeholder="Buscar...."
      />{" "}
      <Boton texto="Nuevo" href='/dashboard/usuarios/new'/>
    
   
    </div>
  );
};

export default NavUsuario;
