import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Products } from "@/app/libs/models/productos";
import * as XLSX from "xlsx";
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No se recibió un archivo" }, { status: 400 });
    }

    // Leer el archivo en formato Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    /* // Definir carpeta temporal segura
    const tempDir = path.join(process.cwd(), "public", "temp");
    const tempPath = path.join(tempDir, file.name);

    // Crear la carpeta si no existe
    await fs.mkdir(tempDir, { recursive: true });

    // Guardar temporalmente el archivo
    await fs.writeFile(tempPath, buffer);
 */
    // *** Nueva forma de leer el archivo Excel desde el buffer ***
    const workbook = XLSX.read(buffer, { type: "buffer" });

    // Obtener la primera hoja del archivo
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Conectar a la BD
    await connectDb();

    // Procesar y actualizar productos
    const updates = data.map(async (row) => {
      const { id, stock, precio_por_unidad } = row;
      return Products.findOneAndUpdate(
        { _id: id },
        { $set: { stock, precio_por_unidad } },
        { new: true }
      );
    });

    await Promise.all(updates);

    // Eliminar el archivo temporal después de usarlo
    await fs.unlink(tempPath);

    return NextResponse.json({ message: "Productos actualizados correctamente" });
  } catch (error) {
    console.error("Error al procesar el archivo:", error);
    return NextResponse.json({ error: "Error al procesar el archivo" }, { status: 500 });
  }
}
