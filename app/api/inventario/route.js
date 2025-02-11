import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Inventario } from "@/app/libs/models/inventario";
import mongoose from "mongoose";
import { User } from "@/app/libs/models/usuarios";
import { findUserId } from "@/app/libs/findUserId";

export async function POST(req) {
  try {
    const { fecha, productos, area, autor, userId } = await req.json();

    await connectDb();
    const idfound = await findUserId(userId)
    // Verificar si el autor es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(autor)) {
      return NextResponse.json(
        { error: "El autor debe ser un ObjectId válido" },
        { status: 400 }
      );
    }


    const usuarioExiste = await User.findById(autor);
    if (!usuarioExiste) {
      return NextResponse.json(
        { error: "El usuario no existe" },
        { status: 400 }
      );
    }
    const inventarios = await Inventario.find({});

    const exist = inventarios.find((inventario) => {
      return inventario.fecha === fecha && inventario.area === area;
    });

    if (exist) {
      return NextResponse.json(
        { error: "No se puede repetir inventario o área" },
        { status: 401 }
      );
    }

    const newInventario = new Inventario({
      fecha,
      productos,
      area,
      autor: usuarioExiste._id,
      userId:idfound
    });

    const inventarioGuardado = await newInventario.save();

    return NextResponse.json(inventarioGuardado);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
