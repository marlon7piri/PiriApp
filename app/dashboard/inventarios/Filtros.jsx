"use client";

import React from "react";

const Filtros = ({
  obtenerFecha,
  fechaseleccionada,
  area,
  setArea,
  filtrarPorArea,
}) => {
  const filtrar = (e) => {
    obtenerFecha(e.target.value);
  };

  const areafiltrada = (e) => {
    filtrarPorArea(e.target.value);
  };
  return (
    <div className="flex gap-2">
      <input
        type="date"
        onChange={filtrar}
        value={fechaseleccionada}
        className="cursor-pointer"
      />
      <select onChange={(e)=>areafiltrada(e)} value={area} className="cursor-pointer">
        <option value="todo">todo</option>
        <option value="cocina">cocina</option>
        <option value="barra">barra</option>
      </select>
    </div>
  );
};

export default Filtros;
