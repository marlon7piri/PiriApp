"use client";

import React, { useState } from "react";
import Filtros from "./Filtros";
import TablaInventarios from "./TablaInventarios";
import { UrlWeb } from "@/app/libs/UrlWeb";
import toast from "react-hot-toast";

const Inventarios = () => {
  const [inventarios, setInventarios] = useState();
  const [fechaseleccionada, setFechaseleccionada] = useState("");
  const [error, setError] = useState("")

  //obtener la fecha elegida por el filtro Filtros

  const obtenerFecha = async (fecha) => {
    setFechaseleccionada(fecha);
    const result = await obtenerInventario(fecha);

    setInventarios(result);
  };
  //hacer una peticion fetch a /api/inventarios y retornar el inventario segun la fecha seleccionada
  const obtenerInventario = async (fecha) => {
    const res = await fetch(`${UrlWeb}/inventario/${fecha}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });


    if(!res.ok){
      setError(res.error)
      return 
    }
    const invent = await res.json();
    return invent;
  };
  //pasarselo a tablainvenatrio como parametro para q muestre el inventario de ese
  return (
    <div>
      <Filtros obtenerFecha={obtenerFecha}  fechaseleccionada={fechaseleccionada}/>
      <span>{error}</span>
      <TablaInventarios
        inventarios={inventarios}
        fechaseleccionada={fechaseleccionada}
      />
    </div>
  );
};

export default Inventarios;
