"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FiltrosProductos = ({ tablaProductos, setProductos }) => {
  const [terminobusqueda, setTerminobusqueda] = useState("");
  const router = useRouter()
  const [filtros, setFiltros] = useState({
    mayor: "mayor",
  });

  const handlerSearch = (e) => {
    setTerminobusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminobusqueda) => {
    const result = tablaProductos.filter((producto) => {
      if (
        producto.nombre
          .toString()
          .toLowerCase()
          .includes(terminobusqueda.toLowerCase())
      ) {
        return producto;
      }
    });
    setProductos(result);
  };

  const filtrarPorCantidades = (e) => {
    setFiltros(e.target.value);
    if (e.target.value == "mayor") {
      let result = tablaProductos.sort((a, b) => {
        return a.stock - b.stock;
      });
      setProductos(result);

    } else {
      let result = tablaProductos.sort((a, b) => {
        return b.stock - a.stock;
      });
      setProductos(result);
    }
  };
  return (
    <nav className="flex gap-4 justify-between  shadow-2xl  rounded-md  mt-24">
      <input
        type="text"
        onChange={handlerSearch}
        className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
        placeholder="Buscar...."
      />{" "}
      <select name=""  id="" onChange={(e) => filtrarPorCantidades(e)}  className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500">
        <option value={filtros.mayor}>Mayor Cantidad</option>
        <option value={filtros.menor}>Menor Cantidad</option>
      </select>
    </nav>
  );
};

export default FiltrosProductos;
