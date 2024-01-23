"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { GrDocumentPdf } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { useClientContext } from "../../context/ClientProvider";
import { UrlWeb } from "@/app/libs/UrlWeb";
import toast from "react-hot-toast";

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

    // Devuelve la fecha formateada

    const res = await fetch(`${UrlWeb}/inventario`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ fecha: fechaFormateada, productos }),
    });

    if (!res.ok) {
      toast.error("Error al enviar el inventario, intente nuevamente");
    } else {
      toast.success("Inventario enviado");
    }
  };
  return (
    <nav className="flex gap-4 justify-between  shadow-2xl  rounded-md  mt-32">
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
        className="bg-sky-700 px-4  py-2 text-slate-50 rounded-md hover:bg-sky-900 "
      >
        <GrDocumentPdf />
      </button>
      <button
        onClick={EnviarInventario}
        className="bg-sky-700 px-4  py-2 text-slate-50 rounded-md hover:bg-sky-900 "
      >
        Enviar
      </button>
    </nav>
  );
};

export default FiltrosProductos;
