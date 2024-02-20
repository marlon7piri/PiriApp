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

  console.log(id);
  console.log(
    username,
    password,
    email,
    phone,
    isAdmin,
    isActive,
    address,
    id_restaurante
  );

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

    console.log(restaurantefound);

    if (!restaurantefound) {
      return NextResponse.json({ message: "No hay restaurantes" });
    }
    return NextResponse.json(restaurantefound);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
