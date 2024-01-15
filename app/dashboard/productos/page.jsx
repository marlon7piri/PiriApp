import React from "react";
import ListaDeProductos from "./ListaDeProductos";
import NavProductos from "./NavProductos";
import { getProducts } from "@/app/libs/data";

export default async function Productos({ searchParams }) {
  const q = searchParams?.query || "";

  const productos = await getProducts(q);

  const precios = productos.filter((e) => e.precio_por_unidad !== undefined );
  const pesos_por_unidad = productos.map((e) => e.presentacion_por_unidad );
  console.log(precios)
  var valores = [];
  var pesos = [];

  // Calcular el promedio ponderado
  var sumaProductos = 0;
  var sumaPesos = 0;

  for (var i = 0; i < productos.length; i++) {

    sumaProductos += valores[i] * pesos[i];
    sumaPesos += pesos[i];
  }

  var promedioPonderado = sumaProductos / sumaPesos;

  console.log("Promedio Ponderado:", promedioPonderado);

  return (
    <div className="flex flex-col gap-4 ">
      <NavProductos />
      <ListaDeProductos productos={productos} />
    </div>
  );
}
