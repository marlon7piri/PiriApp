
import BotonPDF from "@/app/components/BotonPDF";
import React from "react";
import BotonDelete from "./BotonDelete";

const TablaInventarios = ({ inventarios, fecha }) => {



  return (
    <div className="w-full overflow-scroll">
      <h1 className="mt-4 text-3xl font-bold text-center">Fecha Elegida: {fecha}</h1>


      <table className="w-full h-full  relative text-sm text-left text-gray-500 dark:text-gray-400 mt-8">
        <thead className=" text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400   ">
          <tr>
            <th scope="col" className="px-6 py-3  ">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3">
              Area
            </th>
            <th scope="col" className="px-6 py-3">
              Autor
            </th>
            <th scope="col" className="px-6 py-3">
              Descargar
            </th>
            <th scope="col" className="px-6 py-3">
              Accion
            </th>


          </tr>
        </thead>
        <tbody className="w-full">

          {inventarios?.length === 0 ? <h1 className="text-center mt-2 w-full text-slate-900">No hay inventarios para este dia</h1> :
            inventarios?.map((e) => {
              return (
                <tr className="border border-slate-300 border-b-3" key={e._id}>

                  <td className="px-6 py-3">{e.fecha}</td>
                  <td className="px-6 py-3">{e.area}</td>
                  <td className="px-6 py-3">{e.autor?.username}</td>
                  <td className="px-2 py-2">
                  <BotonPDF productos={e.productos} autor={e.autor?.username} /> 
                    
                    </td>
                  <td className="px-2 py-2">
                    <BotonDelete id={e._id}/>
                    </td>
                </tr>
              );
            })

          }
        </tbody>
      </table>
    </div>
  );
};

export default TablaInventarios;
