import { findRestauranteId } from "../../findRestauranteId";
import { Item } from "../../models/item";
import { connectDb } from "../../mongoDb";

export const getItems = async (query, restaurante_id) => {
  const queryExp = new RegExp(query, "i");
  try {
    await connectDb();
    const idRestaurante = await findRestauranteId(restaurante_id);
    let filtro = {};
    if (query) filtro.nombre = { $regex: queryExp };
    filtro.restaurante_id = idRestaurante;

    if (!idRestaurante) throw new Error("Restaurante no encontrado");

    const items = await Item.find(filtro).populate("ingredientes");
    return { items };
  } catch (error) {
    throw new Error("Error del servidor", error);
  }
};
