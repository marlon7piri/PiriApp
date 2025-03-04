"use client";
import React from "react";
import styles from "@/app/dashboard/productos/styles.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Boton from "@/app/components/Boton";

const NavPlatos = () => {
  const { replace } = useRouter();
  const searchparams = useSearchParams();
  const path = usePathname();

  const Filtrar = (e) => {
    const busqueda = e.target.value;
    const params = new URLSearchParams(searchparams);
    if (busqueda) {
      params.set("query", busqueda);
    } else {
      params.delete("query");
    }

    replace(`${path}?${params}`);
  };
  return (
    <div
      className={`flex  items-center gap-4 bg-slate-50 shadow-2xl p-4 rounded-md mt-8 mb-8 ${styles.containerSearch}`}
    >
      <div className={styles.btncontainer}>
        <input type="text" onChange={Filtrar} />
        <div>
          <Boton texto="Nuevo" href="/dashboard/platos/new" />
        </div>
      </div>
    </div>
  );
};

export default NavPlatos;
