"use client";
import React from "react";

const FormNewPlato = ({ recetas }) => {
  return (
    <div>
      <input type="text" placeholder="Buscar receta" />
      {recetas?.map((e) => e.nombre)}
    </div>
  );
};

export default FormNewPlato;
