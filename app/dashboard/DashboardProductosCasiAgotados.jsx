

import React, { useEffect } from "react";
import styles from './section.module.css'
import { useClientContext } from "../context/ClientProvider";

const DashboardProductosCasiAgotados = () => {

    const { setTotalProductos ,totalProductos} = useClientContext();
    


 /*    const ordenarProductos = ()=>{
        const ordenados = totalProductos.sort((a,b)=>{
           return  a.stock - b.stock
        })

        console.log(ordenados) 

    }
 */
  /*   useEffect(()=>{
        ordenarProductos()
    },[]) */

    var productos = [
        { nombre: 'Producto1', cantidad: 10 },
        { nombre: 'Producto2', cantidad: 20 },
        { nombre: 'Producto3', cantidad: 15 },
        { nombre: 'Producto4', cantidad: 25 },
        { nombre: 'Producto5', cantidad: 18 },
        { nombre: 'Producto6', cantidad: 12 },
        // ... más productos
    ];
    
    // Mostrar solo los 5 primeros productos
    var primerosCincoProductos = productos.slice(0, 5);



  return (
    <div className={styles.productosCasiAgotados}>
        <h2>Productos Casi Agotados</h2>
    <ul >
      <li>{primerosCincoProductos.map((e)=>{
        return <p>{e.nombre}</p>
      })}</li>
     
    </ul>
    </div>
  );
};

export default DashboardProductosCasiAgotados;
