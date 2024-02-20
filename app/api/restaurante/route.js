import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Restaurante } from "@/app/libs/models/restaurante";
import { User } from "@/app/libs/models/usuarios";
import bcrypt from "bcrypt";
import { Products } from "@/app/libs/models/productos";

export async function GET() {
  try {
    connectDb();
    const restaurantes = await Restaurante.find({}).populate("usuarios").populate('productos');

    if (!restaurantes)
      return NextResponse.json({ message: "No hay restaurantes" });

    return NextResponse.json(restaurantes);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

export async function POST(req) {
  try {
    connectDb();

    //Insertando restaurantes
    /*  const alalmarest = await Restaurante.create({ nombre: "Al Alma" });
    const bbqchicken = await Restaurante.create({ nombre: "BBQ Chicken" }); */

    //Insertando usuarios y productos a cada restaurante
    /* 

    
    const usuario1 = await User.create({
      username: "Marlon Rodriguez",
      password: await bcrypt.hash("marlon7piri",10),
      email: "marlon7piri@gmail.com",
      phone: "65844123",
      isAdmin: true,
      isActive: true,
      address: "ph sky blue tower",
      restaurante: alalmarest._id,
    });
    const usuario2 = await User.create({
      username: "Antonio Tome",
      password: await bcrypt.hash("antonio1234",10),
      email: "antonio@gmail.com",
      phone: "65844123",
      isAdmin: true,
      isActive: true,
      address: "ph sky blue tower",
      restaurante: bbqchicken._id,
    });

    alalmarest.usuarios.push(usuario1._id);
    bbqchicken.usuarios.push(usuario2._id); */

    const product1 = await Products.create({
      nombre: "Espinaca",
      precio: 16.89,
      categoria: "cocina",
      unidad: "KG",
      proveedor: "Alex Brair",
      mas_vendido: true,
      stock: 0.065,
      stock_min: 1,
      createdAt: "2024-01-11T05:51:38.876Z",
      updatedAt: "2024-01-14T13:44:08.551Z",
      __v: 0,
      costo: 2.5,
      itbms: 0,
      precio_por_unidad: 0.75,
      presentacion_por_unidad: 0.3,
      restaurante: "65c6c91c9f3fe53d9bb1bc82",
    });

    const product2 = await Products.create({
      nombre: "Albahaca",
      precio: 16.89,
      categoria: "cocina",
      unidad: "KG",
      proveedor: "Alex Brair",
      mas_vendido: true,
      stock: 0.065,
      stock_min: 1,
      createdAt: "2024-01-11T05:51:38.876Z",
      updatedAt: "2024-01-14T13:44:08.551Z",
      __v: 0,
      costo: 2.5,
      itbms: 0,
      precio_por_unidad: 0.75,
      presentacion_por_unidad: 0.3,
      restaurante: "65c6c91c9f3fe53d9bb1bc82",
    });
    const alalmarest = await Restaurante.findById({
      _id: "65c6c91c9f3fe53d9bb1bc82",
    });

    alalmarest.productos.push(product1);

    await alalmarest.save();
    /*    await bbqchicken.save(); */

    return NextResponse.json({ message: "Data creada" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
