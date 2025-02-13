import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Area } from "@/app/libs/models/area";
import { Restaurante } from "@/app/libs/models/restaurante";

export async function GET() {
    try {
        await connectDb();
        const areas = await Area.find({})

        if (!areas)
            return NextResponse.json({ message: "No hay areas" });

        return NextResponse.json(areas);
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}

export async function POST(req) {
    try {
        await connectDb();

        const { nombre, restaurante_id } = await req.json()


        const idRest = await Restaurante.findById(restaurante_id)

        if (!idRest) {
            return NextResponse.json({ message: 'No existe el restaurante' });
        }
        const newArea = new Area({ nombre, restaurante_id })


        await newArea.save()
        return NextResponse.json({ message: "Data creada", data: newArea });
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}
