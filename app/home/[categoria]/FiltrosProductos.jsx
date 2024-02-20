"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useClientContext } from "../../context/ClientProvider";
import { UrlWeb } from "@/app/libs/UrlWeb";
import toast from "react-hot-toast";
import Spinner from "@/app/components/Spinner";
import styles from "./filtros.module.css";
import BotonPDF from "@/app/components/BotonPDF";
import BotonEXCEL from "@/app/components/BotonEXCEL";

const FiltrosProductos = () => {
  const {
    tablaProductos,
    setProductos,
    productos,
    setAvisodecorreo,
    avisodecorreo,
  } = useClientContext();
  const [terminobusqueda, setTerminobusqueda] = useState("");
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [masvendidos, setMasvendidos] = useState('')

  const handlerSearch = (e) => {
    setTerminobusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminobusqueda) => {
    const result = tablaProductos.filter((producto) => {
      if (
        producto.nombre
          .toString()
          .toLowerCase()
          .includes(terminobusqueda.toLowerCase())
      ) {
        return producto;
      }
    });
    setProductos(result);
  };

  const filtrarPorCantidades = (value) => {
    if (value == "mayor") {
      let result = tablaProductos.sort((a, b) => {
        return b.stock - a.stock;
      });
      setProductos(result);
    } else {
      let result = tablaProductos.sort((a, b) => {
        return a.stock - b.stock;
      });
      setProductos(result);
    }
    router.refresh();
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
      body: JSON.stringify({ fecha: fechaFormateada, productos, area }),
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

  const handlerSelectTipoInventario =(e)=>{
    setMasvendidos(e)
    console.log(masvendidos)
    filtrarTipoInventario()
  }

  const filtrarTipoInventario = (e) => {
  
    const res = tablaProductos.filter((item) => {
      return e.target.value === 'mas'  ? item.mas_vendido : item;
    });

    setProductos(res)
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
        onChange={filtrarTipoInventario}
        className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500 cursor-pointer"
      >
        <option value="todos">Todos</option>
        <option value="mas">Mas Vendidos</option>
      </select>
      <div className='flex gap-4'>
      <BotonPDF productos={productos} 
    setAvisodecorreo={setAvisodecorreo}
    avisodecorreo={avisodecorreo}/>
      <BotonEXCEL productos={productos}/>
      </div>
      <button
        disabled={loading}
        onClick={EnviarInventario}
        className="w-[100px] flex justify-center items-center bg-sky-700 px-4  py-2 text-slate-50 rounded-md hover:bg-sky-900 "
      >
        {loading ? <Spinner /> : "Enviar"}
      </button>
    </nav>
  );
};

export default FiltrosProductos;
