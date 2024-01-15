import { NextResponse } from "next/server";
import { Products } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";

export  async function GET(req,{params}) {
   const id =  params.id
    try {
    connectDb();
    const allproducts = await Products.findById(id);

    if (!allproducts) return NextResponse.json({message:"No hay productos"});
    return NextResponse.json(allproducts);
  } catch (error) {
    return Response.json({ message: error });
  } 
}

export  async function PUT(req,{params}) {
  const id =  params.id
  const data = await req.json()


 
   try {
   connectDb();
   const allproducts = await Products.findByIdAndUpdate(id,data);

   if (!allproducts) return NextResponse.json({message:"No hay productos"});
   return NextResponse.json(allproducts);
 } catch (error) {
   return Response.json({ message: error });
 }  
}