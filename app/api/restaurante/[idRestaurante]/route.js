import { Restaurante } from "@/app/libs/models/restaurante";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const id = params.idRestaurante;
  const {
    username,
    password,
    email,
    phone,
    isAdmin,
    isActive,
    address,
    id_restaurante,
  } = await req.json();

  

  try {
    connectDb();

    const restaurantefound = await Restaurante.findByIdAndUpdate(
      id,
      {
        $push: {
          users: {
            username,
            password,
            email,
            phone,
            isAdmin,
            isActive,
            address,
            id_restaurante,
          },
        },
      },
      {
        new: true,
      }
    );

    

    if (!restaurantefound) {
      return NextResponse.json({ message: "No hay restaurantes" });
    }
    return NextResponse.json(restaurantefound);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
