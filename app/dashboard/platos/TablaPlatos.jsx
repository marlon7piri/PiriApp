import React from "react";
import BotonDelete from "./BotonDelete";
import { convertidordefecha } from "@/app/libs/convertidordefecha";

const TablaPlatos = ({ items }) => {
  return (
    <div className="w-full h-full relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <table className="w-full  m-auto text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 cursor-pointer">
              Nombre
            </th>

            <th scope="col" className="px-6 py-3">
              Precio
            </th>
            <th scope="col" className="px-6 py-3">
              Ingredientes
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>

            <th scope="col" className="px-6 py-3">
              Accion
            </th>
          </tr>
        </thead>
        <tbody className="w-full ">
          {!items ? (
            <h1 className="w-full text-center text-2xl text-slate-900">
              No hay items{" "}
            </h1>
          ) : (
            items?.map((product) => {
              const ingredientes = product.ingredientes.map((e) => {
                return { nombre: e.nombre };
              });

              return (
                <tr
                  className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={product._id}
                >
                  <td className="px-6 py-4 text-gray-900 dark:text-slate-50">
                    {product.nombre}
                  </td>
                  <td className="px-6 py-4">${product.precio}</td>
                  <td className="px-6 py-4">
                    <ul>
                      {ingredientes.map((y) => (
                        <li>{y.nombre}</li>
                      ))}
                    </ul>
                  </td>

                  <td className="px-6 py-4 ">
                    {convertidordefecha(product.createdAt)}
                  </td>

                  <td className="w-max px-2 py-2  flex gap-1 justify-center items-center">
                    <BotonDelete id={product._id} />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPlatos;
