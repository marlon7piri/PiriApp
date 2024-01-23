import React from "react";

const TablaInventarios = ({ inventarios, fechaseleccionada }) => {
  return (
    <div className="w-full overflow-scroll">
      <h1 className="mt-4 text-3xl font-bold text-center">Fecha Elegida: {fechaseleccionada.toString().split("-").reverse().join("/").substring(0, 10)}</h1>

      <table className="w-full h-full  relative text-sm text-left text-gray-500 dark:text-gray-400 mt-8">
        <thead className=" text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400   ">
          <tr>
            <th scope="col" className="px-6 py-3  ">
              Productos
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Unidad
            </th>
            <th scope="col" className="px-6 py-3">
              Costo
            </th>
            <th scope="col" className="px-6 py-3">
              Presentacion_Por_Unidad
            </th>
            <th scope="col" className="px-6 py-3">
              Proveedor
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
            {inventarios?.length === 0  && <h1 className="text-center mt-2 w-full text-slate-900">No hay inventarios para este dia</h1>}
          {inventarios?.map((item) => {
            {
              return item?.productos?.map((e) => {
                return (
                  <tr className="border border-slate-300 border-b-3">
                    {" "}
                    <td className="px-6 py-3">{e.nombre}</td>
                    <td className="px-6 py-3">{e.stock}</td>
                    <td className="px-6 py-3">{e.unidad}</td>
                    <td className="px-6 py-3">{e.costo}</td>
                    <td className="px-6 py-3">{e.presentacion_por_unidad}</td>
                    <td className="px-6 py-3">{e.proveedor}</td>
                  </tr>
                );
              });
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablaInventarios;
