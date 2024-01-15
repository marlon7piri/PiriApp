"use client";
import EditIcon from "@/app/icons/EditIcon";
import StoreIcon from "@/app/icons/StoreIcon";
import Link from "next/link";
import React from "react";
import { useClientContext } from "../context/ClientProvider";
import toast from "react-hot-toast";

const TablaProductos = ({ productos, loading,ordenarPorNombre }) => {
  const { pedidos, setPedidos } = useClientContext();

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

  if (loading)
    return <h1 className="text-5xl text-center font-black">Cargando.....</h1>;
  return (
    <table className="w-2/4 h-full m-auto text-sm text-left text-gray-500 dark:text-gray-400 mt-24">
      <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400">
        <tr>
          {/*  <th scope="col" className="px-6 py-3">
            Image
          </th> */}
          <th scope="col" className="px-6 py-3 cursor-pointer" onClick={ordenarPorNombre}>
            Producto
          </th>

          <th scope="col" className="px-6 py-3">
            Stock
          </th>
          <th scope="col" className="px-6 py-3">
            Stock Minimo
          </th>
          <th scope="col" className="px-6 py-3">
            Unidad
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
        {!productos ? (
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
                <td className="px-6 py-4 text-gray-900 dark:text-slate-50">
                  {product.nombre}
                </td>

                <td
                  className={` ${
                    product.stock < product.stock_min
                      ? "px-6 py-4   text-red-700 font-bold"
                      : "px-6 py-4   text-green-700 "
                  }  `}
                >
                  {product.stock}
                </td>

                <td className="px-6 py-4 ">{product.stock_min}</td>
                <td className="px-6 py-4 ">{product.unidad}</td>
                <td className="px-6 py-4">{product.proveedor}</td>

                <td className="w-max px-2 py-2  flex gap-1 justify-center items-center">
                  <Link
                    href={`/home/${product.categoria}/${product._id}`}
                    className=" rounded-full p-2 bg-sky-500 font-medium text-slate-50 dark:text-slate-50 hover:bg-sky-700"
                  >
                    <EditIcon />
                  </Link>
                  <button
                    onClick={() => addPedidos(product)}
                    className=" rounded-full p-2 bg-green-500 font-medium text-slate-50 dark:text-slate-50 hover:bg-green-700"
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
