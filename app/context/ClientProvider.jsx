"use client";

import { UrlWeb } from "@/app/libs/UrlWeb";
import { useParams, useRouter } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";
const { createContext, useContext, useState, useEffect } = require("react");

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const [totalProductos, setTotalProductos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [orden, setOrden] = useState([]);

  const [mermas, setMermas] = useState([]);
  const [tablademermas, setTablademermas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tablaProductos, setTablaProductos] = useState([]);
  const [dinerototal, setDinerototal] = useState(0);
  const [avisodecorreo, setAvisodecorreo] = useState(false);
  const [session, setSession] = useState({})
  const router = useRouter();
  const params = useParams();

  const getProductoPorCategoria = async (categoria) => {
    const res = await fetch(
      `${UrlWeb}/categoriaProducto`,

      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({categoria})
      }
    );
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    const obtenerTodosLosProductos = async () => {
      const res = await fetch(`${UrlWeb}/productos`);
      const data = await res.json();
      setTotalProductos(data);
      conteoDineroTotal(data);
    };
    obtenerTodosLosProductos();
  }, []);

  const ordenarPorNombre = () => {
    let res = tablaProductos.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, undefined, { sensitivity: "base" })
    );

    setProductos(res);
    router.refresh();
  };

 

  const conteoDineroTotal = (array) => {
    const valor = array.reduce((acc, current) => {
      return (acc += current.precio_por_unidad * current.stock);
    }, 0);

    setDinerototal(valor);
  };
  return (
    <SessionProvider>
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
          dinerototal,
          avisodecorreo,
          setAvisodecorreo,
          orden,
          setOrden,session, setSession
        }}
      >
        {children}
      </ClientContext.Provider>
    </SessionProvider>
  );
};

export const useClientContext = () => {
  return useContext(ClientContext);
};
