"use client";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useClientContext } from "../../context/ClientProvider";
import { UrlWeb } from "@/app/libs/UrlWeb";
import toast from "react-hot-toast";
import Spinner from "@/app/components/Spinner";
import styles from "./filtros.module.css";
import BotonPDF from "@/app/components/BotonPDF";
import BotonEXCEL from "@/app/components/BotonEXCEL";
import { useDebouncedCallback } from "use-debounce";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

const FiltrosProductos = () => {
  const {
    tablaProductos,
    setProductos,
    productos,
    setAvisodecorreo,
    avisodecorreo,
  } = useClientContext();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [masvendidos, setMasvendidos] = useState('')
  const searchparams = useSearchParams()
  const path = usePathname()

  const handlerSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchparams)
    const termino = e.target.value

    if (params) {
      params.set('query', termino)
    } else {
      params.delete('query')
    }

    router.replace(`${path}?${params}`)

  }, 300);




  const filtrarPorCantidades = (value) => {
    const params = new URLSearchParams(searchparams)

    if (params) {
      params.set('orden', value)
    } else {
      params.delete('orden')
    }

    router.replace(`${path}?${params}`)

  };

  const filtarMasVendido = (e) => {

    const params = new URLSearchParams(searchparams)


    if (e.target.value === 'mas') {
      params.set("mas_vendido", "true")
    } else {
      params.delete("mas_vendido")
    }
    router.replace(`${path}?${params}`)

  };

  const EnviarInventario = async () => {
    let fechaActual = new Date();

    // Obtiene los componentes de la fecha (día, mes y año)
    let dia = fechaActual.getDate().toString().padStart(2, "0");
    let mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan desde 0, por lo que se suma 1
    let año = fechaActual.getFullYear();

    // Formatea la fecha en el formato deseado (puedes ajustar el formato según tus preferencias)
    let fechaFormateada = año + "-" + mes + "-" + dia;
    // Devuelve la fecha formateada

    let area = params.categoria;

    setLoading(true);
    const res = await fetch(`${UrlWeb}/inventario`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ fecha: fechaFormateada, productos, area, autor: session.id }),
    });

    if (!res.ok) {
      const result = await res.json();

      toast.error(result.error);
    } else {
      toast.success("Inventario enviado");
      const result = await res.json();

    }
    setLoading(false);
  };



  
  return (
    <nav className={styles.filtrosContainer}>
      <input
        type="text"
        onChange={handlerSearch}
        className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
        placeholder="Buscar...."
      />{" "}
      <select
        name=""
        id=""
        onChange={(e) => filtrarPorCantidades(e.target.value)}
        className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500 cursor-pointer"
      >
        <option value="mayor">Mayor Cantidad</option>
        <option value="menor">Menor Cantidad</option>
      </select>
      <select
        name=""
        id=""
        onChange={filtarMasVendido}
        className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500 cursor-pointer"
      >
        <option value="todos">Todos</option>
        <option value="mas">Mas Vendidos</option>
      </select>
      <div className='flex gap-4'>
        <BotonPDF productos={productos}
          setAvisodecorreo={setAvisodecorreo}
          avisodecorreo={avisodecorreo} />
        <BotonEXCEL productos={productos} />
      </div>
      <button
        disabled={loading}
        onClick={EnviarInventario}
        className="w-[170px] flex justify-center items-center bg-sky-700 px-4  py-2 text-slate-50 rounded-md hover:bg-sky-900 "
      >
        {loading ? <Spinner /> : "Enviar Inventario"}
      </button>
    </nav>
  );
};

export default FiltrosProductos;
