import { Products } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";
import { findUserId } from "../../findUserId";

export const getProductos = async (categoria, query, mas_vendido, orden, userId) => {

  const queryEx = new RegExp(query, 'i')

  try {
    await connectDb();
    const idfound = await findUserId(userId)

    const filtro = { categoria }
    filtro.userId = idfound
    if (query) filtro.nombre = { $regex: queryEx }

    if (mas_vendido == 'true') filtro.mas_vendido = true


    const ordenamiento = {}
    if (orden === 'mayor') ordenamiento.stock = -1
    if (orden === 'menor') ordenamiento.stock = 1
   

    const allproducts = await Products.find(filtro).sort(ordenamiento);

    return allproducts;
  } catch (error) {
    throw new Error(error)
     return NextResponse.json({ message: error });
  }
};

export const getAllProductos = async (query, userId) => {

  const queryEx = new RegExp(query, 'i')

  try {
    await connectDb();

    const idfound = await findUserId(userId)
    const filtro = {}

    filtro.userId = idfound
    if (query) filtro.nombre = { $regex: queryEx }



    const allproducts = await Products.find(filtro);

    return allproducts;
  } catch (error) {
    throw new Error(error)
    /*  return NextResponse.json({ message: error }); */
  }
};