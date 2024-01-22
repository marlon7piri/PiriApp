"use client";

import StoreIcon from "@/app/icons/StoreIcon";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useClientContext } from "../../context/ClientProvider";
import DeleteIcon from "@/app/icons/DeleteIcon";
import toast from "react-hot-toast";

const TablaPedidos = () => {
  const { pedidos, setPedidos } = useClientContext();


  const deletePedidos = (id) => {
    const res = pedidos.filter((item) => {
      return item._id !== id;
    });
    setPedidos(res);
    toast.success("Producto eliminado");
  };

  const handlerChange = (id, cantidad) => {
    setPedidos((prevState) => {
      prevState.map((item) =>
        item._id === id ? { ...item, cantidadapedir: cantidad } : item
      );
    });
  };

  const generarOrden = () => {
    console.log(pedidos);
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      {" "}
      <button
        onClick={generarOrden}
        className="bg-green-900 py-2 px-4 rounded-md"
      >
        Add
      </button>
      <table className="w-2/4 m-auto text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Pedir
            </th>
            <th scope="col" className="px-6 py-3">
              Unidad
            </th>
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
          {pedidos?.length === 0 ? (
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
                  <td className="px-2 py-2 text-gray-900">
                    <input
                      type="number"
                      value={pedidos?.cantidadapedir}
                      className="w-[60px]"
                      onChange={(e) =>
                        handlerChange(product._id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-900">{product.unidad}</td>
                  <td className="px-6 py-4 text-gray-900">{product.nombre}</td>
                  <td
                    className={`${
                      product.stock < product.stock_min
                        ? "px-6 py-4   text-red-700 font-bold"
                        : "px-6 py-4   text-green-700 "
                    }  
                     
                   `}
                  >
                    {product.stock}
                  </td>

                  <td className="px-6 py-4 ">{product.stock_min}</td>
                  <td className="px-6 py-4"> {product.proveedor}</td>

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
