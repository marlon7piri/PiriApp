import Link from "next/link";
import React, { Suspense } from "react";
import Image from "next/image";
import Botones from "./Botones";
import { convertidordefecha } from "@/app/libs/convertidordefecha";

const ListaDeProductos = ({ productos } ) => {

  
  return (
    <Suspense>
      <div className="w-full h-full relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              {/*  <th scope="col" className="px-6 py-3">
                    Image
                  </th> */}
              <th scope="col" className="px-6 py-3">
                Producto
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>

              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>

              <th scope="col" className="px-6 py-3">
                Accion
              </th>
            </tr>
          </thead>
          <tbody className="w-full ">
            {productos?.length === 0 ? (
              <h1 className="w-full  bg-red-500 text-center text-2xl text-slate-900">
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
                    <td className="px-6 py-4 text-gray-900">
                      {product.nombre}
                    </td>
                    <td className="px-6 py-4">${product.precio}</td>

                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      {convertidordefecha(product.createdAt)} 
                    </td>
                    <td className="px-6 py-4">{product.stock}</td>

                    <td className="w-max px-2 py-2  flex gap-1 justify-center items-center">
                     <Botones allproducto={product._id}/>
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
