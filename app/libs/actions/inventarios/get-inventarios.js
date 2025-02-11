import { findUserId } from "../../findUserId"
import { Inventario } from "../../models/inventario"
import { connectDb } from "../../mongoDb"

export const getAllInventarios = async (userId, fecha, area) => {

    let data = []
    try {
        await connectDb()

        const idfound = await findUserId(userId)
        let filtros = {}



        filtros = { userId: idfound, fecha, area }


        if (fecha === '') filtros = {}

        if (fecha) filtros.fecha = fecha
        if (area) filtros.area = area

        if (area === 'todos') {
            filtros = { fecha }
        }


    

        const inventarios = await Inventario.find(filtros).populate('autor')

        if (!inventarios) {
            return data
        }

        return inventarios
    } catch (error) {
        throw new Error(error)
    }

}