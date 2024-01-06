import { NextResponse } from "next/server";
import { Products } from "@/app/libs/models";
import { connectDb } from "@/app/libs/mongoDb";

export  async function GET({params}) {
   const id =  params.id
   console.log(id);
    try {
    connectDb();
    const allproducts = await Products.findById(id);

    if (!allproducts) return NextResponse.json({message:"No hay productos"});
console.log(allproducts);
    return NextResponse.json(allproducts);
  } catch (error) {
    return Response.json({ message: error });
  } 
}