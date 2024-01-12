import { User} from "@/app/libs/models";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export  async function DELETE(req,{params}) {
    const id = await params.id;

  
    await connectDb();
    try {
      const productdeleted = await User.findByIdAndDelete(id);
  
      if (!productdeleted) return NextResponse.json(404);
  
      return NextResponse.json(productdeleted);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  }
export  async function GET(req,{params}) {
  const id = await params.id;


  

    try {
      await connectDb();
      const usuario = await User.findById(id);
  
      if (!usuario) return NextResponse.json(404);
      
  console.log(usuario);
      return NextResponse.json(usuario);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  }


 /*  export  async function GET({params}) {

    const id = params.id
    try {
      connectDb();
      const usuarios = await User.findById(id);
  
      if (!usuarios) return NextResponse.json({message:"No hay productos"});
  
      return NextResponse.json(usuarios);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  } */
  