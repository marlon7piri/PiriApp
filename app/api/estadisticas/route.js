import { Products } from "@/app/libs/models/productos";
import { NextResponse } from "next/server";

export async function GET(req) {
    const restaurante_id  =  await req.query;
  
    try {
      const pipeline = [
        { $match: { restaurante_id } }, // Filtra por restaurante_id
        {
          $group: {
            _id: null,
            dineroTotal: { $sum: { $multiply: ["$stock", "$costo"] } },
            productos: { $push: "$$ROOT" }, // Guarda todos los productos para procesar después
          },
        },
        {
          $project: {
            _id: 0,
            dineroTotal: 1,
            productos: {
              $map: {
                input: "$productos",
                as: "producto",
                in: {
                  stock: "$$producto.stock",
                  stock_min: "$$producto.stock_min",
                  mas_vendido: "$$producto.mas_vendido",
                },
              },
            },
          },
        },
      ];
  
      const result = await Products.aggregate(pipeline);
  
      if (result.length === 0) {
        return NextResponse.json(
          { cantidadProductos: 0, dineroTotal: 0, productosAgotados: [], productosMasVendidos: [] },
          { status: 200 }
        );
      }
  
    
      const { dineroTotal, productos } = result[0];
      // Procesar productos
      const productosAgotados = productos.filter(
        (producto) => producto.stock < producto.stock_min
      ).slice(0,3);
  
      const productosMasVendidos = productos
        .filter((producto) => producto.mas_vendido)
        .slice(0, 5); // Tomar solo los 5 más vendidos
  
      return NextResponse.json(
        {
          cantidadProductos: productos.length,
          dineroTotal,
          productosAgotados,
          productosMasVendidos,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Error al cargar estadísticas: " + error.message },
        { status: 500 }
      );
    }
  }