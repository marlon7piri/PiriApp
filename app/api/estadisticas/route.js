import { Products } from "@/app/libs/models/productos";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        let dineroTotal = 0;
        let productosAgotados = [];
        let productosMasVendidos = [];

        // Obtener la cantidad total de productos
        const cantidadProductos = await Products.countDocuments();

        // Obtener los productos
        const productos = await Products.find({});

        // Procesar productos
        productos.forEach((element) => {
            dineroTotal += element.stock * element.precio_por_unidad;

            if (element.stock < element.stock_min) {
                productosAgotados.push(element);
            }

            if (element.mas_vendido) {
                productosMasVendidos.push(element);
            }
        });

        // Tomar solo los 5 más vendidos
        const productosTop = productosMasVendidos.slice(0, 5);

        return NextResponse.json(
            { cantidadProductos, dineroTotal, productosAgotados, productosMasVendidos: productosTop },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error en la API de estadísticas:", error);
        return NextResponse.json({ error: "Error al cargar estadísticas" }, { status: 500 });
    }
}
