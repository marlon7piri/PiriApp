import Botones from '@/app/dashboard/productos/Botones';
import Link from 'next/link';
import React from 'react'

const TablaProductos = ({productos}) => {
  return (
    <table className="w-2/4 m-auto text-sm text-left text-gray-500 dark:text-gray-400 border border-slate-500">
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
                  <td className="px-6 py-4 text-gray-900">{product.nombre}</td>

                  <td className="px-6 py-4">{product.stock}</td>
                 
                  <td className="px-6 py-4">{product.stock_min}</td>
                  <td className="px-6 py-4">proveedores</td>

                  <td className="w-max px-2 py-2  flex gap-1 justify-center items-center">
                  <Link href={`/home/${product.categoria}/${product._id}`}  className="px-4 py-1 rounded bg-sky-500 font-medium text-slate-900 dark:text-blue-500 hover:bg-sky-700">editar</Link> 
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
  )
}

export default TablaProductos