import { Products } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";
import { findRestauranteId } from "../../findRestauranteId";

export const getProductos = async (area, query, mas_vendido, orden, restaurante_id) => {

  const queryEx = new RegExp(query, 'i')
  console.log(area, query, mas_vendido, orden, restaurante_id)
  try {
    await connectDb();
    const idfound = await findRestauranteId(restaurante_id)

    const filtro = { area, restaurante_id: idfound }
    filtro.restaurante_id = idfound
    if (query) filtro.nombre = { $regex: queryEx }

    if (mas_vendido == 'true') filtro.mas_vendido = true


    const ordenamiento = {}
    if (orden === 'mayor') ordenamiento.stock = -1
    if (orden === 'menor') ordenamiento.stock = 1


    const allproducts = await Products.find(filtro).sort(ordenamiento).populate('area nombre').lean();

    return allproducts;
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};

export const getAllProductos = async (query, restaurante_id) => {

  const queryEx = new RegExp(query, 'i')

  try {
    await connectDb();

    const idfound = await findRestauranteId(restaurante_id)
    const filtro = { restaurante_id }

    filtro.restaurante_id = idfound
    if (query) filtro.nombre = { $regex: queryEx }



    const allproducts = await Products.find(filtro).populate('area nombre').lean();
    if (!allproducts) {
      return NextResponse.json([]);
    }

    return allproducts;
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};