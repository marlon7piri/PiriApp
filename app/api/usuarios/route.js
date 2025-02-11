import { NextResponse } from "next/server";
import { User } from "@/app/libs/models/usuarios";
import { connectDb } from "@/app/libs/mongoDb";
import bcrypt from "bcrypt";
import { Restaurante } from "@/app/libs/models/restaurante";
import { findUserId } from "@/app/libs/findUserId";

export async function GET() {
  try {
    connectDb();

    const usuarios = await User.find({}).populate("restaurante");
    if (!usuarios) return NextResponse.json({ message: "No hay usuario" });

    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function POST(req, { params }) {
  const {
    username,
    password,
    email,
    isAdmin,
    isActive,
    phone,
    address,
    userId,
    restaurante,
  } = await req.json();


  try {
    connectDb();

    const exist = await User.findOne({ email });

    if (exist) {
      return NextResponse.json(
        { message: "El usuario  o el email ya esta en uso" },
        { status: 500 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const passwordhas = await bcrypt.hash(password, salt);

    const idfound = await findUserId(userId)
    const user = await User.create({
      username,
      password: passwordhas,
      email,
      isAdmin,
      isActive,
      phone,
      address,
      userId: idfound || "",
      restaurante,
    });



    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
