"use client";
import EditIcon from "@/app/icons/EditIcon";
import StoreIcon from "@/app/icons/StoreIcon";
import Link from "next/link";
import React from "react";
import { useClientContext } from "../../context/ClientProvider";
import toast from "react-hot-toast";

const TablaProductos = ({ productos }) => {
  const { pedidos, setPedidos, loading, ordenarPorNombre } = useClientContext();


  const addPedidos = (product) => {
    const product_exist = pedidos.find((e) => {
      return e._id === product._id;
    });

    if (product_exist) {
      toast.error("El producto agregado ya existe");
      return
    } else {
      setPedidos([...pedidos, product]);
      toast.success("producto agregado al pedido");
    }
  };

  if (loading) {
    return <div class="loader"></div>

  }
  return (
    <table className=" w-2/4  m-auto text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
      <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400  overflow-scroll">
        <tr>

          <th scope="col" className="px-6 py-3 cursor-pointer" onClick={ordenarPorNombre}>
            Producto
          </th>

         
          <th scope="col" className="px-6 py-3">
            Unidad
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
      <tbody className="w-full overflow-scroll">
        {!productos || productos.length == 0 ? (
          <h1 className="w-full   text-center text-xl text-slate-50">
            No hay productos{" "}
          </h1>
        ) : (
          productos?.map((product) => {
            return (
              <tr
                className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={product._id}
              >

                <td className="px-6 py-4 text-gray-900 dark:text-slate-50">
                  {product.nombre}
                </td>
                <td className="px-6 py-4 ">{product.unidad}</td>

                <td
                  className={` ${product.stock < product.stock_min
                    ? "px-6 py-4   text-red-700 font-bold"
                    : "px-6 py-4   text-green-700 "
                    }  `}
                >
                  {product.stock}
                </td>

                <td className="px-6 py-4 ">{product.stock_min}</td>
                <td className="px-6 py-4">{product.proveedor}</td>

                <td className="w-max h-full px-2 py-2  flex gap-2 justify-center items-center ">
                  <Link
                    href={`/home/${product.area._id}/${product._id}`}
                    className=" rounded-md p-2 bg-sky-500 font-medium text-slate-50 dark:text-slate-50 hover:bg-sky-700"
                  >
                    <EditIcon />
                  </Link>
                  <button
                    onClick={() => addPedidos(product)}
                    className=" rounded-md p-2 bg-green-500 font-medium text-slate-50 dark:text-slate-50 hover:bg-green-700"
                  >
                    <StoreIcon />
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default TablaProductos;
