import React from "react";
import NavUsuario from "./NavUsuario";
import ListOfUsers from "./ListOfUsers";
import Pagination from "./Pagination";
import { getUsuarios } from "@/app/libs/data";


export default async function Users({searchParams}) {
  const q = searchParams?.query || ""
  const data = await getUsuarios(q);

  return (
    <div className="w-full h-full ">
      <h1 className="text-center text-gray-900 font-bold text-2xl">Usuarios</h1>

      <NavUsuario />
      <ListOfUsers data={data} />
      <Pagination />
    </div>
  );
}
