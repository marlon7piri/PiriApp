"use client";
import React, { useEffect, useState } from "react";
import TablaProductos from "./TablaProductos";
import FiltrosProductos from "./FiltrosProductos";

const url = "https://clone-invu-app.vercel.app/api";
const url2 = "http://localhost:3000/api";
const getProductoPorCategoria = async (categoria) => {
  const res = await fetch(`${url2}/categoriaProducto`, {
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

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 min-h-screen">
      <FiltrosProductos
        tablaProductos={tablaProductos}
        setProductos={setProductos}
      />
      <TablaProductos productos={productos}  loading={loading}/>
    </div>
  );
};

export default Categoria;
