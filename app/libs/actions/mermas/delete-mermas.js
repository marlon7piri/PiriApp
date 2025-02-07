import { Merma } from "../../models/mermas";
import { connectDb } from "../../mongoDb";

export const deleteMerma = async (id) => {
  
  try {
     connectDb();
    const merma = await Merma.findByIdAndDelete(id);
    
    return merma;
  } catch (error) {
     throw  new Error({ message: "Error al borrar la merma ", id });
  }
};
