import { Merma } from "../../models/mermas";
import { connectDb } from "../../mongoDb";

export const deleteMerma = async (id) => {
  console.log(id);
  try {
     connectDb();
    const merma = await Merma.findByIdAndDelete(id);
    console.log(merma);
    return merma;
  } catch (error) {
     throw  new Error({ message: "Error al borrar la merma ", id });
  }
};
