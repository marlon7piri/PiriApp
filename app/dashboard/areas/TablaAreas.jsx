"use client";

import React from "react";

import TablaRow from "./TablaRow";

const TablaAreas = ({ categorias }) => {
  return (
    <table className="w-full h-full  relative text-sm text-left text-gray-500 dark:text-gray-400 shadow-2xl">
      <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400   ">
        <tr>
          <th scope="col" className="px-6 py-3 cursor-pointer">
            Nombre
          </th>
          <th scope="col" className="px-6 py-3">
            Fecha Creación
          </th>

          <th scope="col" className="px-6 py-3">
            Accion
          </th>
        </tr>
      </thead>
      <TablaRow categorias={categorias} />
    </table>
  );
};

export default TablaAreas;
