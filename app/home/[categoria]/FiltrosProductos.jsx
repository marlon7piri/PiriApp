"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { GrDocumentPdf } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { useClientContext } from "../../context/ClientProvider";
import { UrlWeb } from "@/app/libs/UrlWeb";
import toast from "react-hot-toast";
import Spinner from "@/app/components/Spinner";
import styles from './filtros.module.css'

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

  const descargarPDF = () => {
    const fecha2 = new Date().toLocaleString().substring(0, 10);
    const fecha =
      fecha2.toString(); /* .substring(0,10) */ /* .reverse().split("-").join("") */

    const jspdf = new jsPDF();
    jspdf.text(
      `Inventario del Dia ${fecha}, tutor ${session.username}`,
      30,
      10
    );

    const column = ["Producto", "Stock", "Unidad", "Proveedor"];
    const body = productos.map((e) => {
      return [e.nombre, e.stock, e.unidad, e.proveedor];
    });

    jspdf.autoTable({
      startY: 30,
      head: [column],
      body: body,
    });
    setAvisodecorreo(!avisodecorreo);
    jspdf.save(`Inventario_Semanal-${fecha}.pdf`);
  };

  const EnviarInventario = async () => {
    let fechaActual = new Date();

    // Obtiene los componentes de la fecha (día, mes y año)
    let dia = fechaActual.getDate();
    let mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan desde 0, por lo que se suma 1
    let año = fechaActual.getFullYear();

    // Formatea la fecha en el formato deseado (puedes ajustar el formato según tus preferencias)
    let fechaFormateada = año + "-" + mes + "-" + dia;
    console.log(fechaFormateada);
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
      <button
        onClick={descargarPDF}
        className="flex gap-2 justify-center items-center bg-sky-700 px-4  py-2 text-slate-50 rounded-md hover:bg-sky-900 "
      >
        <span>Descargar</span> <GrDocumentPdf />
      </button>
      <button
      disabled={loading}
        onClick={EnviarInventario}
        className="w-[100px] flex justify-center items-center bg-sky-700 px-4  py-2 text-slate-50 rounded-md hover:bg-sky-900 "
      >
        {loading ? <Spinner/> : "Enviar"}
      </button>
    </nav>
  );
};

export default FiltrosProductos;
