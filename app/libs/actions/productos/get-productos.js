import { Products } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";

export const getProductos = async () => {
  try {
     connectDb();
    const allproducts = await Products.find();

    return allproducts;
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};