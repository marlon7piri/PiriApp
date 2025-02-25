import { Products } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";
import { findRestauranteId } from "../../findRestauranteId";

export const getProductos = async (area, query, page = 1, mas_vendido, orden, restaurante_id) => {

  const queryEx = new RegExp(query, 'i')
  const limit = 5
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

    const skip = (page - 1) * limit

    const allproducts = await Products.find(filtro).skip(skip).limit(limit).sort(ordenamiento).populate('area nombre').lean();
    const totalProducts = await Products.countDocuments(filtro)

    return { allproducts, totalPage: Math.ceil(totalProducts / limit) };
  } catch (error) {
    throw new Error('Error del servidor' + error)
  }
};

export const getAllProductos = async (query, page = 1, restaurante_id, allData = 'no') => {

  const queryEx = new RegExp(query, 'i')

  let allproducts
  let totalPage = 1
  try {
    await connectDb();

    const idfound = await findRestauranteId(restaurante_id)
    const filtro = { restaurante_id }
    filtro.restaurante_id = idfound

    if (query) filtro.nombre = { $regex: queryEx }

    if (allData == 'si') {

      allproducts = await Products.find(filtro).populate('area nombre').lean();

      if (!allproducts) {
        throw new Error('No existen productos')
      }
    return { allproducts, totalPage };

    } else {

      const limit = 10
      const skip = (page - 1) * limit

      allproducts = await Products.find(filtro).skip(skip).limit(limit).populate('area nombre').lean();

      if (!allproducts) {
        throw new Error('No existen productos')
      }
      const totalProducts = await Products.countDocuments(filtro);
      totalPage = Math.ceil(totalProducts / limit)
      return { allproducts, totalPage };
    }

  } catch (error) {
    console.error("Error en getAllProductos:", error);
    throw new Error('Error del servidor' + error)
  }
};