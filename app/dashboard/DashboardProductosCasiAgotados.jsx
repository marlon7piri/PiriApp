

import React, { useEffect } from "react";
import styles from './section.module.css'
import { useClientContext } from "../home/context/ClientProvider";

const DashboardProductosCasiAgotados = () => {

    const { setTotalProductos ,totalProductos} = useClientContext();
    


    const ordenarProductos = ()=>{
        const ordenados = totalProductos.sort((a,b)=>{
           return  a.stock - b.stock
        })

        console.log(ordenados)

    }

    useEffect(()=>{
        ordenarProductos()
    },[])
  return (
    <div className={styles.productosCasiAgotados}>
        <h2>Productos Casi Agotados</h2>
    <ul >
      <li>Producto 1</li>
      <li>Producto 2</li>
      <li>Producto 3</li>
      <li>Producto 4</li>
      <li>Producto 5</li>
    </ul>
    </div>
  );
};

export default DashboardProductosCasiAgotados;
