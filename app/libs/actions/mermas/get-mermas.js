'use server'


import { Merma } from "../../models/mermas";
import { connectDb } from "../../mongoDb";

export const getMermas = async () => {
  try {
    connectDb();
    const mermas = await Merma.find();

    return mermas;
  } catch (error) {
     throw new Error(error);
  }
};