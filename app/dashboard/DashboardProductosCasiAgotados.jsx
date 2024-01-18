import React, { useEffect, useState } from "react";
import styles from "./section.module.css";
import { useClientContext } from "../context/ClientProvider";
import Image from "next/image";

const DashboardProductosCasiAgotados = () => {
  const { setTotalProductos, totalProductos } = useClientContext();

  const [productos, setProductos] = useState([]);

  const ordenarProductos = () => {
    const ordenados = totalProductos.sort((a, b) => {
      return a.stock - b.stock;
    });

    setProductos(ordenados);
  };

  useEffect(() => {
    ordenarProductos();
  }, []);

  // Mostrar solo los 5 primeros productos
  var primerosCincoProductos = productos.slice(0, 7);

  return (
    <div className={styles.productosCasiAgotados}>
      <div className="w-full mt-4">
        <Image
          src="/boxagotado.png"
          alt="icono de productos agotados"
          width={65}
          height={65}
          className="object-cover"
        />
        <p className="text-xl text-red-900 font-bold">
          Productos Casi Agotados
        </p>

        <table className="w-full text-slate-800">
        <thead className="w-full text-left">
          <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          </tr>
        </thead>
        <tbody>
        {primerosCincoProductos.map((e) => {
          return (
            <tr className="border border-b-slate-500">
              <td>{e.nombre}</td>
              <td>{e.precio_por_unidad}</td>
              <td>{e.stock}</td>
              </tr>
              
          );
        })}
         </tbody>
      </table>
       
      </div>
    </div>
  );
};

export default DashboardProductosCasiAgotados;
