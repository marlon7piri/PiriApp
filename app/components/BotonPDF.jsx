

import jsPDF from 'jspdf';
import "jspdf-autotable";

import { useSession } from 'next-auth/react';
import React from 'react'
import { GrDocumentPdf } from 'react-icons/gr';

const BotonPDF = ({productos,setAvisodecorreo,avisodecorreo}) => {
    const { data: session } = useSession();

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
  return (
    <button
        onClick={descargarPDF}
        className="flex gap-2 justify-center items-center bg-red-700 w-max h-16 p-4 text-slate-50 rounded-md hover:bg-red-900 "
      >
        <GrDocumentPdf />
      </button>
  )
}

export default BotonPDF