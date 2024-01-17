"use client";

import { UrlWeb } from "@/app/libs/UrlWeb";
import { useParams, useRouter } from "next/navigation";
import NextAuthProvider from "../components/NextAuthProvider";
import {useSession} from 'next-auth/react'
const { createContext, useContext, useState, useEffect } = require("react");

const ClientContext = createContext();



export const ClientProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const [totalProductos, setTotalProductos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mermas, setMermas] = useState([]);
  const [tablademermas, setTablademermas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tablaProductos, setTablaProductos] = useState([]);
  const {data:session} =  useSession()
  const router = useRouter();
  const params = useParams();

 /*  console.log(session) */

  const getProductoPorCategoria = async (categoria) => {
    const res = await fetch(
      `${UrlWeb}/categoriaProducto`,
     
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(categoria),
      }
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const obtenerTodosLosProductos = async () => {
      const res = await fetch(`${UrlWeb}/productos`, { cache: "no-cache" });
      const data = await res.json();

      setTotalProductos(data);
    };
    obtenerTodosLosProductos();
  },[]);
  const ordenarPorNombre = () => {
    let res = tablaProductos.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, undefined, { sensitivity: "base" })
    );

    setProductos(res);
    router.refresh();
  };
  return (
    <NextAuthProvider>
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
        mermas,
        setMermas,
        setTablademermas,
        tablademermas,
      }}
    >
      {children}
    </ClientContext.Provider>
    </NextAuthProvider>
  );
};

export const useClientContext = () => {
  return useContext(ClientContext);
};
