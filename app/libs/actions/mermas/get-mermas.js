'use server'


import { findUserId } from "../../findUserId";
import { Merma } from "../../models/mermas";
import { connectDb } from "../../mongoDb";

export const getMermas = async (userId) => {
  try {
    await connectDb();
    const idfound = await findUserId(userId)
    const mermas = await Merma.find({userId:idfound});

    return mermas;
  } catch (error) {
     throw new Error(error);
  }
};