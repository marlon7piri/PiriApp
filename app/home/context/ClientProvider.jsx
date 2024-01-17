"use client";

import { UrlWeb } from "@/app/libs/UrlWeb";
import { useParams, useRouter } from "next/navigation";

const { createContext, useContext, useState, useEffect } = require("react");

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [productos, setProductos] = useState([]);
  const [mermas, setMermas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tablaProductos, setTablaProductos] = useState([]);

  const router = useRouter();
  const params = useParams();

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

  useEffect(() => {
    const getMermas = async () => {
      const res = await fetch(`${UrlWeb}/mermas`);
      const data = await res.json();
      setMermas(data);
    };
    getMermas();
  });

  useEffect(() => {
    const obtenerTodosLosProductos = async () => {
      const res = await fetch(`${UrlWeb}/productos`);
      const data = await res.json();

      setTotalProductos(data);
    };
    obtenerTodosLosProductos();
  });
  const ordenarPorNombre = () => {
    let res = tablaProductos.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, undefined, { sensitivity: "base" })
    );

    setProductos(res);
    router.refresh();
  };
  return (
    <ClientContext.Provider
      value={{
        pedidos,
        setPedidos,
        ordenarPorNombre,
        setProductos,
        setTablaProductos,
        productos,
        loading,
        setLoading,
        setTotalProductos,
        totalProductos,
        tablaProductos,
        getProductoPorCategoria,
        mermas,setMermas
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  return useContext(ClientContext);
};
