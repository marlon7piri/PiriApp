'use client'
import React, { useEffect, useState } from "react";
import styles from "./section.module.css";
import { useClientContext } from "../context/ClientProvider";
import Image from "next/image";

const DashboardProductosCasiAgotados = ({productosAgotados}) => {




 

 


  return (
    <div className={styles.productosCasiAgotados}>
      <div className="w-full mt-4 min-h-max">
        
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
        {productosAgotados?.map((e) => {
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
