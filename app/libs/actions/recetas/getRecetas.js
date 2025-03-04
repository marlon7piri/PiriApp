import { findRestauranteId } from "../../findRestauranteId";
import { Receta } from "../../models/recetas";
import { connectDb } from "../../mongoDb";

export const getRecetas = async (query, restaurante_id) => {
  const queryExp = new RegExp(query, "i");
  try {
    await connectDb();
    const idRestaurante = await findRestauranteId(restaurante_id);
    let filtro = {};
    if (query) filtro.nombre = { $regex: queryExp };
    filtro.restaurante_id = idRestaurante;

    if (!idRestaurante) throw new Error("Restaurante no encontrado");

    const recetas = await Receta.find(filtro)
      .populate("productos.producto nombre costo")
      .lean();

    return { recetas };
  } catch (error) {
    throw new Error("Error del servidor", error);
  }
};
