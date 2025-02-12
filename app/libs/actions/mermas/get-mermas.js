'use server'


import { findUserId } from "../../findUserId";
import { Merma } from "../../models/mermas";
import { connectDb } from "../../mongoDb";

export const getMermas = async (userId, fecha) => {
  try {
    await connectDb();
    const idfound = await findUserId(userId)
    let filtro = {}
    
    filtro = { userId: idfound, fecha }
    if (fecha === '') filtro = {}

    const mermas = await Merma.find(filtro);

    return mermas;
  } catch (error) {
    throw new Error(error);
  }
};