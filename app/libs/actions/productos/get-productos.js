import { Products } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";

export const getProductos = async (categoria, query, mas_vendido, orden) => {

  const queryEx = new RegExp(query, 'i')

  try {
    await connectDb();


    const filtro = { categoria }
    if (query) filtro.nombre = { $regex: queryEx }

    if (mas_vendido == 'true') filtro.mas_vendido = true


    const ordenamiento = {}
    if (orden === 'mayor') ordenamiento.stock = -1
    if (orden === 'menor') ordenamiento.stock = 1

    const allproducts = await Products.find(filtro).sort(ordenamiento);

    return allproducts;
  } catch (error) {
    throw new Error(error)
    /*  return NextResponse.json({ message: error }); */
  }
};

export const getAllProductos = async (query) => {

  const queryEx = new RegExp(query, 'i')

  try {
    await connectDb();


    const filtro = {}
    if (query) filtro.nombre = { $regex: queryEx }



    const allproducts = await Products.find(filtro);

    return allproducts;
  } catch (error) {
    throw new Error(error)
    /*  return NextResponse.json({ message: error }); */
  }
};