import { NextResponse } from "next/server";
import { Products } from "../../libs/models";
import { connectDb } from "@/app/libs/mongoDb";

export  async function POST(req) {
   const type = await req.json()
   try {
    connectDb();
    const allproducts = await Products.find({categoria:type});

    if (!allproducts) return NextResponse.json({message:"No hay productos"});
    return NextResponse.json(allproducts);
  } catch (error) {
    return Response.json({ message: error });
  } 
}