import React, { Suspense } from "react";
import Link from "next/link";
import TablaOFUsers from "./TablaOFUsers";

const ListOfUsers = ({ data }) => {
  return (
    <table className="w-full h-full  relative text-sm text-left text-gray-500 dark:text-gray-400 shadow-2xl">
      <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Nombre
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Telefono
          </th>
          {/*  <th scope="col" className="px-6 py-3">
                Direccion
              </th> */}
          <th scope="col" className="px-6 py-3">
            Rol
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>

          <th scope="col" className="px-6 py-3">
            Accion
          </th>
        </tr>
      </thead>

      <tbody className="w-full ">
        <TablaOFUsers data={data} />
      </tbody>
    </table>
  );
};

export default ListOfUsers;
