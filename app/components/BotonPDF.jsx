'use client'

import jsPDF from 'jspdf';
import "jspdf-autotable";

import React from 'react'
import { GrDocumentPdf } from 'react-icons/gr';



const BotonPDF = ({productos,autor,}) => {

    const descargarPDF = async() => {
     
        const fecha2 = new Date().toLocaleString().substring(0, 10);
        const fecha =
          fecha2.toString();
    
        const jspdf = new jsPDF();
        jspdf.text(
          `Inventario del Dia ${fecha} autor: ${autor}`,
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
       
        jspdf.save(`Inventario_Semanal-${fecha}.pdf`);
      };
  return (
    <button
        onClick={descargarPDF}
        className=" bg-red-700   p-2 text-slate-50 rounded-md hover:bg-red-900"
      >
        <GrDocumentPdf />
      </button>
  )
}

export default BotonPDF