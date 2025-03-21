import { Products } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";
import mongoose from "mongoose";

import { NextResponse } from "next/server";


export async function DELETE(req, { params }) {
  const id = await params.id;

  try {
    await connectDb();
    const productdeleted = await Products.findByIdAndDelete(id);

    if (!productdeleted) return NextResponse.json(404);

    return NextResponse.json(productdeleted);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
export async function GET(req, { params }) {


  const id = await params.id;

  await connectDb();
  try {
    const producto = await Products.findById(id);

    if (!producto) return NextResponse.json(404);

    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function PUT(req, { params }) {
  const id = params.id;
  const {
    nombre,
    area,
    stock,
    stock_min,
    unidad,
    mas_vendido,
    proveedor,
    itbms,
    costo,
    presentacion_por_unidad,
    precio_por_unidad,
  } = await req.json();




  let valor = 0;
  let impuesto_del_valor = 0;
  let costototal = 0;

  const impuestoProducto = {
    0: (precio_por_unidad * 0).toFixed(2),
    7: (precio_por_unidad * 0.07).toFixed(2),
    10: (precio_por_unidad * 0.1).toFixed(2)
  }

  if (itbms == 0) {
    valor = precio_por_unidad / parseFloat(presentacion_por_unidad.toFixed(2));
    

    costototal = valor;
  } else if (itbms == 7) {
    valor = precio_por_unidad / parseFloat(presentacion_por_unidad.toFixed(2));
    impuesto_del_valor = valor * 0.07;
    costototal = valor + impuesto_del_valor;

  } else if (itbms == 10) {
    valor = precio_por_unidad / parseFloat(presentacion_por_unidad.toFixed(2));
    impuesto_del_valor = valor * 0.1;
    costototal = valor + impuesto_del_valor;
  }



  try {
    await connectDb();




    const producto = await Products.findByIdAndUpdate(id, {
      nombre,
      precio_por_unidad,
      presentacion_por_unidad,
      area,
      stock,
      stock_min,
      unidad,
      mas_vendido,
      proveedor,
      itbms,
      costo: parseFloat(costototal.toFixed(2)),
    });

    if (!producto) {
      return NextResponse.json({ message: "No se encontro ningun producto" });
    }

    return NextResponse.json(producto);
  } catch (error) {
    console.log(error)
    return Response.json({ message: error });
  }
}
