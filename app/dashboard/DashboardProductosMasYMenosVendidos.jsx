"use client";

import React, { useEffect, useState } from "react";
import styles from "./section.module.css";
import { useClientContext } from "../context/ClientProvider";

const DashboardProductosMasYMenosVendidos = ({productosMasVendidos}) => {




  return (
    <div className={styles.masVendidos}>
      <h2 className="text-green-700 text-left text-xl w-max my-4 font-bold">
        5 Productos Mas Vendidos
      </h2>

      <table className="w-full text-slate-800">
        <thead className="w-full text-left">
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productosMasVendidos?.slice(0, 10).map((e) => {
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
  );
};

export default DashboardProductosMasYMenosVendidos;
