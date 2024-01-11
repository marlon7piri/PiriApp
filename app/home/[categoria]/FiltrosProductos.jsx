"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {jsPDF} from 'jspdf'
import  'jspdf-autotable'
import { convertidordefecha } from "@/app/libs/convertidordefecha";
import { GrDocumentPdf } from "react-icons/gr";

const FiltrosProductos = ({ tablaProductos, setProductos,productos }) => {
  const [terminobusqueda, setTerminobusqueda] = useState("");
  const router = useRouter()
  const [filtros, setFiltros] = useState({
    mayor: "mayor",
  });

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

  const filtrarPorCantidades = (e) => {
    setFiltros(e.target.value);
    if (e.target.value == "mayor") {
      let result = tablaProductos.sort((a, b) => {
        return a.stock - b.stock;
      });
      setProductos(result);

    } else {
      let result = tablaProductos.sort((a, b) => {
        return b.stock - a.stock;
      });
      setProductos(result);
    }
  };


  const descargarPDF =()=>{
    const fecha2 =   new Date().toLocaleString().substring(0,10)
    const fecha = fecha2.toString()/* .substring(0,10) *//* .reverse().split("-").join("") */
    
     const jspdf = new jsPDF()
     jspdf.text(`Inventario del Dia ${fecha}`,30,10)

     const column =["Producto","Stock","Proveedor"]
     const body = productos.map((e)=>{
      return [e.nombre,e.stock,e.proveedor]
     })

     jspdf.autoTable({
      startY:30,
      head:[column],
      body:body
     })

     jspdf.save(`Inventario_Semanal-${fecha}.pdf`) 
  }
  return (
    <nav className="flex gap-4 justify-between  shadow-2xl  rounded-md  mt-24">
      <input
        type="text"
        onChange={handlerSearch}
        className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
        placeholder="Buscar...."
      />{" "}
      <select name=""  id="" onChange={(e) => filtrarPorCantidades(e)}  className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500">
        <option value={filtros.mayor}>Mayor Cantidad</option>
        <option value={filtros.menor}>Menor Cantidad</option>
      </select>
      <button onClick={descargarPDF} className="bg-sky-700 px-4  py-2 text-slate-50 rounded-md hover:bg-sky-900 "><GrDocumentPdf/></button>
    </nav>
  );
};

export default FiltrosProductos;
