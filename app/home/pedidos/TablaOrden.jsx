"use client";
import { useClientContext } from "@/app/context/ClientProvider";
import DeleteIcon from "@/app/icons/DeleteIcon";
import React from "react";

export const TablaOrden = () => {
  const { orden } = useClientContext();

  return (
    <table className="  border border-slate-500">
      <thead className=" bg-slate-900 text-slate-50 ">
        <tr className="p-2">
          <th className="p-2">Producto</th>
          <th  className="p-2">Cantidad</th>
          <th  className="p-2">Accion</th>
        </tr>
      </thead>
      <tbody>{orden.length ===0 ? <h1>No hay productos</h1> : orden?.map((e) => {
          return (
            <tr className=" border border-b-slate-700 ">
              <td className="w-3/4"> {e.nombre} </td>
              <td className="w-3/4">
                {" "}
                {e.cantidad}/{e.unidad}{" "}
              </td>

              <td className="p-2 block">
                <button
                  className=" rounded-full p-2 bg-red-500 font-medium text-slate-50 dark:text-blue-500 hover:bg-sky-700"
                  /*  onClick={() => deleteOrden(e._id)} */
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          );
        }) }
       
      </tbody>
    </table>
  );
};
