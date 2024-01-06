import { Products } from "@/app/libs/models";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";

export  async function DELETE(req,{params}) {
    const id = await params.id;

    console.log(id);
  
    await connectDb();
    try {
      const productdeleted = await Products.findByIdAndDelete(id);
  
      if (!productdeleted) return NextResponse.json(404);
  
      return NextResponse.json(productdeleted);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  }
export  async function GET({params}) {

  const regex = new RegExp(params, "i");


  
    await connectDb();
    try {
      const productdeleted = await Products.findById({ name: { $regex: regex } });
  
      if (!productdeleted) return NextResponse.json(404);
  
      return NextResponse.json(productdeleted);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  }
  