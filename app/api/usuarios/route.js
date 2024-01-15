import { NextResponse } from "next/server";
import { User } from "@/app/libs/models/usuarios";
import { connectDb } from "@/app/libs/mongoDb";
import bcrypt from "bcrypt";

export async function GET({ params }) {
  const id = await params.id;
  try {
    connectDb();
    const usuarios = await User.findById(id);

    if (!usuarios) return NextResponse.json({ message: "No hay productos" });

    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function POST(req) {
  const { username, password, email, isAdmin, isActive, phone, address } =
    await req.json();
    console.log(username, password, email, isAdmin, isActive, phone, address)
  try {
    connectDb();

    const exist = await User.findOne({ email });

    if (exist) {
      return NextResponse.json(
        { message: "El usuario  o el email existe" },
        { status: 500 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const passwordhas = await bcrypt.hash(password, salt);
   await User.create({
      username,
      password: passwordhas,
      email,
      isAdmin,
      isActive,
      phone,
      address,
    });

   
    return  NextResponse.json(
      { message: "Usuario Registrado "},
      { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
