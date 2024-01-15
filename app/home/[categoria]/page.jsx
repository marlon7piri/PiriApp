"use client";
import React, { useEffect, useState } from "react";
import TablaProductos from "./TablaProductos";
import FiltrosProductos from "./FiltrosProductos";
import { UrlWeb } from "@/app/libs/UrlWeb";
import { useRouter } from "next/navigation";



const getProductoPorCategoria = async (categoria) => {
  const res = await fetch(`${UrlWeb}/categoriaProducto`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(categoria),
  });
  const data = await res.json();
  return data;
};

const Categoria = ({ params }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tablaProductos, setTablaProductos] = useState([]);

  const router = useRouter()
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

  const ordenarPorNombre = () => {
    let res = tablaProductos.sort((a, b) => a.nombre.localeCompare(b.nombre, undefined, { sensitivity: 'base' })
    );
   

 setProductos(res); 
  router.refresh(); 
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 min-h-screen">
      <FiltrosProductos
        tablaProductos={tablaProductos}
        setProductos={setProductos} productos={productos}
      />
      <TablaProductos productos={productos}  loading={loading} ordenarPorNombre={ordenarPorNombre}/>
    </div>
  );
};

export default Categoria;
