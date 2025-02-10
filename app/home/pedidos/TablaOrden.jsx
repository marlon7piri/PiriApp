"use client";
import { useClientContext } from "@/app/context/ClientProvider";
import DeleteIcon from "@/app/icons/DeleteIcon";
import React from "react";

export const TablaOrden = () => {
  const { orden,deleteOrdenProduct } = useClientContext();

  return (
    <table className="  border border-slate-500">
      <thead className=" bg-slate-900 text-slate-50 ">
        <tr className="p-2">
          <th className="p-2">Producto</th>
          <th  className="p-2">Cantidad</th>
          <th  className="p-2">Accion</th>
        </tr>
      </thead>
      <tbody>{orden.length ===0 ? <h1 className="text-center text-slate-50">No hay productos</h1> : orden?.map((e) => {
          return (
            <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
              <td className="px-2 py-3 text-gray-900"> {e.nombre} </td>
              <td className="px-2 py-3 text-gray-900">
                {" "}
                {e.cantidad}/{e.unidad}{" "}
              </td>

              <td className="px-2 py-3 text-gray-900">
                <button
                  className=" rounded-full p-2 bg-red-500 font-medium text-slate-50 dark:text-blue-500 hover:bg-sky-700"
                  onClick={() => deleteOrdenProduct(e._id)}
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
