'use server'


import { findRestauranteId } from "../../findRestauranteId";
import { Merma } from "../../models/mermas";
import { connectDb } from "../../mongoDb";

export const getMermas = async (restaurante_id, fecha) => {
  try {
    await connectDb();
    const idfound = await findRestauranteId(restaurante_id)
    let filtro = {}
    
    filtro = { restaurante_id: idfound, fecha }
    if (fecha === '') filtro = {restaurante_id: idfound}

    const mermas = await Merma.find(filtro);

    return mermas;
  } catch (error) {
    throw new Error(error);
  }
};