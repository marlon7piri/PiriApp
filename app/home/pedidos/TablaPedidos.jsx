"use client";

import StoreIcon from "@/app/icons/StoreIcon";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useClientContext } from "../../context/ClientProvider";
import DeleteIcon from "@/app/icons/DeleteIcon";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UrlWeb } from "@/app/libs/UrlWeb";

const TablaPedidos = ({pedidos}) => {
  const { setPedidos, orden, setOrden } = useClientContext();
  const router = useRouter();
  const[loading,setLoading]=useState(false)

  const deletePedidos = (id) => {
    const res = pedidos.filter((item) => {
      return item._id !== id;
    });
    setPedidos(res);
    toast.success("Producto eliminado");
  };

  const deleteOrden = (id) => {
    const res = orden.filter((e) => {
      return e._id !== id;
    });
    setOrden(res);
  };

  const handlerChange = (id, cantidad) => {
    setPedidos((prevProductos) =>
      prevProductos.map((producto) =>
        producto._id === id ? { ...producto, cantidad,id:producto._id } : producto
      )
    );
  };

  const agregarAlCarrito = async () => {
    // Filtra solo los productos con cantidades mayores a 0
    const productosSeleccionados = pedidos.filter(
      (producto) => producto.cantidad > 0
    );

    setOrden(productosSeleccionados);
    // Enviar los productos al email de cada proveedor
    // Reinicia las cantidades a 0 después de agregar al carrito
    setPedidos((prevProductos) =>
      prevProductos.map((producto) => ({ ...producto, cantidad: 0 }))
    );
  };

  const ordenarPorNombre = () => {
    let res = pedidos.sort((a, b) => {
      return a.proveedor.localeCompare(b.proveedor, undefined, {
        sensitivity: "base",
      });
    });

    setPedidos(res);
    router.refresh();
  };

  const enviarProductosAcomppra = async () => {
   try{
    setLoading(true)
    const res = await fetch(`${UrlWeb}/email`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(orden),
    });

    if (!res.ok) {
      toast.error("Error al enviar el pedido");
    } else {
      toast.success("Pedido enviado satisfactoriamente");
      setOrden([]);
    }
    setLoading(false)
   }catch(error){

   }
  };

  return (
    <table className="w-full   text-sm text-left text-gray-500 dark:text-gray-400 ">
      <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-2 py-3">
            Pedir
          </th>
          <th scope="col" className="px-2 py-3">
            Unidad
          </th>
          <th scope="col" className="px-2 py-3">
            Producto
          </th>

          <th scope="col" className="px-2 py-3">
            Stock
          </th>
          <th scope="col" className="px-2 py-3">
            Stock Minimo
          </th>
          <th
            scope="col"
            className="px-2 py-3 cursor-pointer"
            onClick={ordenarPorNombre}
          >
            Proveedor
          </th>

          <th scope="col" className="px-2 py-3">
            Accion
          </th>
        </tr>
      </thead>
      <tbody className="">
        {pedidos?.length === 0 ? (
          <h1 className="w-full   text-center text-2xl text-slate-50">
            No hay pedidos{" "}
          </h1>
        ) : (
          pedidos?.map((product) => {
            return (
              <tr
                className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={product._id}
              >
                <td className="px-2 py-3 text-gray-900">
                  <input
                    type="number"
                    value={product.cantidad}
                    className="w-[60px]"
                    onChange={(e) =>
                      handlerChange(product._id, parseFloat(e.target.value, 10))
                    }
                  />
                </td>
                <td className="px-2 py-3 text-gray-900">{product.unidad}</td>
                <td className="px-2 py-3 text-gray-900">{product.nombre}</td>
                <td
                  className={`${
                    product.stock < product.stock_min
                      ? "px-2 py-3  text-red-700 font-bold"
                      : "px-2 py-3 text-green-700 "
                  }  
                     
                   `}
                >
                  {product.stock}
                </td>

                <td className="px-2 py-3">{product.stock_min}</td>
                <td className="px-2 py-3"> {product.proveedor}</td>

                <td className="">
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
        <div className="flex gap-2 w-full ">
          <button
            onClick={() => agregarAlCarrito()}
            className="w-[150px] rounded-md mt-2 p-2 bg-red-500 font-medium text-slate-50 dark:text-blue-500 hover:bg-sky-700"
          >
           Agregar a la orden
          </button>
          <button
            onClick={() => enviarProductosAcomppra()}
            className="w-[150px] rounded-md mt-2 p-2 bg-green-500 font-medium text-slate-50 dark:text-blue-500 hover:bg-sky-700"
          >
          {loading ? "Cargando...":  "Realizar el pedido"}
          </button>
        </div>
      </tbody>
    </table>
  );
};

export default TablaPedidos;
