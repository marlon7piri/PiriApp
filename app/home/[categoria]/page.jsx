'use client'
import React, { useEffect, useState } from "react";
import TablaProductos from "./TablaProductos";
import FiltrosProductos from "./FiltrosProductos";


const url ="https://clone-invu-app.vercel.app/api"
const url2 ="http://localhost:3000/api"
const getProductoPorCategoria = async (categoria) => {
  const res = await fetch(`${url}/categoriaProducto`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(categoria),
  });
  const data = await res.json();
  return data;
};

const Categoria =  ({ params }) => {

    const [productos, setProductos] = useState([])
    const [tablaProductos, setTablaProductos] = useState([])
  useEffect(() => {
    const obtenerProductos = async () => {
      const res = await getProductoPorCategoria(params.categoria);
      setProductos(res);
      setTablaProductos(res);
    };
    obtenerProductos()
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-4">
      <FiltrosProductos   tablaProductos={tablaProductos} setProductos={setProductos}/>
      <TablaProductos productos={productos} />
    </div>
  );
};

export default Categoria;
