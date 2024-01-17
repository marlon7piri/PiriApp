"use client";

import React, { useEffect, useState } from "react";
import styles from "./section.module.css";
import { useClientContext } from "../context/ClientProvider";
import { useRouter } from "next/navigation";
import { getProductos } from "../libs/actions/productos/get-productos";

const DashboardProductosMasYMenosVendidos = () => {
  /*  const [productos, setProductos] = useState([])
  const router = useRouter();

 
    useEffect(() => {
      const obtenerProductos = async () => {
        const res = await getProductos();
        setProductos(res);
      };
      obtenerProductos();
    }, []); */

  /*    const ordenarProductos = () => {
    const result = productos.sort((a, b) => {
      return b.stock - a.stock;
    });

    setProductos(result);
    router.refresh();
  };

  const primeroscinco = productos.slice(0, 5);
  useEffect(() => {
    ordenarProductos();
  }, []); */
  return (
    <div className={styles.masVendidos}>
      <h2>Productos Mas Vendidos</h2>
      <ul>
        <li>productos mas vendidos</li>
      </ul>
    </div>
  );
};

export default DashboardProductosMasYMenosVendidos;
