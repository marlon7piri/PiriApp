"use client";
import React, { useEffect, useState } from "react";
import TablaProductos from "./TablaProductos";
import FiltrosProductos from "./FiltrosProductos";
import { UrlWeb } from "@/app/libs/UrlWeb";
import { useRouter } from "next/navigation";
import { useClientContext } from "../../context/ClientProvider";





const Categoria = ({params}) => {
 const {setTablaProductos,setProductos,setLoading,tablaProductos,ordenarPorNombre,getProductoPorCategoria} = useClientContext()

/*   const router = useRouter() */

 useEffect(() => {
    try {
      setLoading(true)
      const obtenerProductos = async () => {
       
        const res = await getProductoPorCategoria(params.categoria);
        setProductos(res);
        setTablaProductos(res);
        

      };
      obtenerProductos();
      setLoading(false)
    } catch (error) {
      console.log(error);
    }

  }, []);

/*   const ordenarPorNombre = () => {
    let res = tablaProductos.sort((a, b) => a.nombre.localeCompare(b.nombre, undefined, { sensitivity: 'base' })
    );
   

 setProductos(res); 
  router.refresh(); 
  };  */

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 min-h-screen">
      <FiltrosProductos
        
      />
      <TablaProductos />
    </div>
  );
};

export default Categoria;
