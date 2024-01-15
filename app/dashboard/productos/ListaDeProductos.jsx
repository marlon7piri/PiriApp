"use client";

import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Botones from "./Botones";
import { convertidordefecha } from "@/app/libs/convertidordefecha";

const ListaDeProductos = ({ productos }) => {
  const [total, setTotal] = useState(0);

  const getTotal = () => {
    const numero = productos.reduce((acc, current) => {
      return acc + current.precio_por_unidad * current.stock;
    }, 0);

    setTotal(numero);
  };

  useEffect(() => {
    getTotal();
  }, [productos]);

 

 

  return (
    <Suspense>
      <div className="w-full h-full relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex gap-2">
          {" "}
          <span className="">Dinero Total en Stock: ${total.toFixed(3)}</span>
          <span className="">
            Cantidad De Productos: {productos.length}
          </span>
        </div>

        <table className="w-full h-full relative text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400   ">
            <tr>
              {/*  <th scope="col" className="px-6 py-3">
                    Image
                  </th> */}
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
              >
                Producto
              </th>
              <th scope="col" className="px-6 py-3">
                Precio Por Unidad
              </th>

              <th scope="col" className="px-6 py-3">
                Presentacion Por Unidad
              </th>

              <th scope="col" className="px-6 py-3">
                Costo
              </th>

              <th scope="col" className="px-6 py-3">
                Proveedor
              </th>
              <th scope="col" className="px-6 py-3">
                Mas Vendido
              </th>
              <th scope="col" className="px-6 py-3">
                Categoria
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de Creacion
              </th>

              <th scope="col" className="px-6 py-3">
                Accion
              </th>
            </tr>
          </thead>
          <tbody className="w-full ">
            {productos?.length === 0 ? (
              <h1 className="w-full   text-center text-2xl text-slate-900">
                No hay productos{" "}
              </h1>
            ) : (
              productos?.map((product) => {
                return (
                  <tr
                    className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={product._id}
                  >
                    <td className="px-6 py-4 ">{product.nombre}</td>
                    <td className="px-6 py-4">${product.precio_por_unidad}</td>

                    <td className="px-6 py-4">
                      {product.presentacion_por_unidad}/{product.unidad}
                    </td>

                    <td className="px-6 py-4">${product.costo}</td>
                    <td className="px-6 py-4">{product.proveedor}</td>
                    <td
                      className={
                        product.mas_vendido
                          ? "px-6 py-4 text-green-700 font-bold"
                          : "px-6 py-4 text-red-700 font-bold"
                      }
                    >
                      {product.mas_vendido ? "Si" : "No"}
                    </td>
                    <td className="px-6 py-4">{product.categoria}</td>
                    <td className="px-6 py-4">
                      {convertidordefecha(product.createdAt)}
                    </td>

                    <td className="w-max px-2 py-2  flex gap-1 justify-center items-center">
                      <Botones allproducto={product._id} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
};

export default ListaDeProductos;
