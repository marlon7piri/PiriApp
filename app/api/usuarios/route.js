import { NextResponse } from "next/server";
import {  User } from "@/app/libs/models";
import { connectDb } from "@/app/libs/mongoDb";
import bcrypt from 'bcrypt'

export  async function GET({params}) {

  const id = await params.id
  try {
    connectDb();
    const usuarios = await User.findById(id);

    if (!usuarios) return NextResponse.json({message:"No hay productos"});

    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}


export  async function POST(req) {
    const { name, password, email, isAdmin, isActive, phone, address} = await req.json()
    try {
      connectDb();

      const salt = await bcrypt.genSalt(10);
      const passwordhas = await bcrypt.hash(password, salt);
      const newuser = new  User({
        name, password, email, isAdmin, isActive, phone, address
      });
  
      const usuario = await newuser.save();
  
      return NextResponse.json(usuario);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  }