"use client";

import React, { useState } from "react";
import Filtros from "./Filtros";
import TablaInventarios from "./TablaInventarios";
import { UrlWeb } from "@/app/libs/UrlWeb";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Inventarios = () => {
  const [inventarios, setInventarios] = useState();
  const [tablaInventarios, setTablaInventarios] = useState();
  const [fechaseleccionada, setFechaseleccionada] = useState("");
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  //obtener la fecha elegida por el filtro Filtros

  const obtenerFecha = async (fecha) => {
    setFechaseleccionada(fecha);
    const result = await obtenerInventario(fecha);
    //pasarselo a tablainvenatrio como parametro para q muestre el inventario de ese
    setLoading(false);
    setInventarios(result);
    setTablaInventarios(result);
  };
  //hacer una peticion fetch a /api/inventarios y retornar el inventario segun la fecha seleccionada

  const obtenerInventario = async (fecha) => {
    setLoading(true);
    const res = await fetch(`${UrlWeb}/inventario/${fecha}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      setError(res.error);
      return;
    }
    const invent = await res.json();
    return invent;
  };

  const filtrarPorArea = (parametro) => {
    setArea(parametro);
    if (parametro === "cocina") {
      const res = tablaInventarios.filter((inventario) => {
        return inventario.area === "cocina";
      });
      setInventarios(res);
    } else if (parametro === "barra") {
      const res = tablaInventarios.filter((inventario) => {
        return inventario.area === "barra";
      });

      setInventarios(res);
    } else {
      const res = tablaInventarios.map((inventario) => {
        return inventario;
      });

      setInventarios(res);
    }
  };
  return (
    <div> 
      <Filtros
        obtenerFecha={obtenerFecha}
        fechaseleccionada={fechaseleccionada}
        area={area}
        setArea={setArea}
        filtrarPorArea={filtrarPorArea}
      />
      <span>{error}</span>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <TablaInventarios
          inventarios={inventarios}
          fechaseleccionada={fechaseleccionada}
        />
      )}
    </div>
  );
};

export default Inventarios;
