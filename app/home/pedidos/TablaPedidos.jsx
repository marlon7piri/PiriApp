'use client'

import StoreIcon from "@/app/icons/StoreIcon";
import Link from "next/link";
import React from "react";
import { useClientContext } from "../context/ClientProvider";
import DeleteIcon from "@/app/icons/DeleteIcon";

const TablaPedidos = () => {

    const { pedidos, setPedidos } = useClientContext();

    const deletePedidos = (id) => {

        const res = pedidos.filter(item => {
            return item._id !== id
        });
        setPedidos(res)
     
      toast.error('producto eliminado del pedido')
    };
  return (
    <div className="w-full h-full flex justify-center items-center">
      {" "}
      <table className="w-2/4 m-auto text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400">
          <tr>
            {/*  <th scope="col" className="px-6 py-3">
          Image
        </th> */}
            <th scope="col" className="px-6 py-3">
              Producto
            </th>

            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Stock Minimo
            </th>
            <th scope="col" className="px-6 py-3">
              Proveedor
            </th>

            <th scope="col" className="px-6 py-3">
              Accion
            </th>
          </tr>
        </thead>
        <tbody className="w-full ">
          {pedidos.length === 0 ? (
            <h1 className="w-full   text-center text-2xl text-slate-900 ">
              No hay pedidos{" "}
            </h1>
          ) : (
            pedidos?.map((product) => {
              return (
                <tr
                  className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={product._id}
                >
                  {/*  {product?.imageUrl && (
                <th>
                  <Image
                    src={product?.imageUrl}
                    width={38}
                    height={38}
                    alt="una imagen"
                    className="object-cover"
                  />
                </th>
              )} */}
                  <td className="px-6 py-4 text-gray-900">{product.nombre}</td>

                  <td className="px-6 py-4">{product.stock}</td>

                  <td
                    className={` ${
                      product.stock < product.stock_min
                        ? "px-6 py-4   text-red-700 font-bold"
                        : "px-6 py-4   text-green-700 "
                    }  `}
                  >
                    {product.stock_min}
                  </td>
                  <td className="px-6 py-4">proveedores</td>

                  <td className="w-max px-2 py-2  flex gap-1 justify-center items-center">
                    <button
                      onClick={() => deletePedidos(product._id)}
                      className=" rounded-full p-2 bg-red-500 font-medium text-slate-50 dark:text-blue-500 hover:bg-sky-700"
                    >
                      <DeleteIcon />
                    </button>
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

export default TablaPedidos;
