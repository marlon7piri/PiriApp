import { findRestauranteId } from "../../findRestauranteId"
import { Inventario } from "../../models/inventario"
import { connectDb } from "../../mongoDb"

export const getAllInventarios = async (restaurante_id, fecha, area) => {

    let data = []
    try {
        await connectDb()

        const idfound = await findRestauranteId(restaurante_id)
        let filtros = {}



        filtros = { restaurante_id: idfound, fecha, area }


        if (fecha === '') filtros = {restaurante_id: idfound}

        if (fecha) filtros.fecha = fecha
        if (area) filtros.area = area

        if (area === 'todos') {
            filtros = { fecha,restaurante_id: idfound }
        }


    

        const inventarios = await Inventario.find(filtros).populate('autor').populate('area')

        if (!inventarios) {
            return data
        }

        return inventarios
    } catch (error) {
        throw new Error(error)
    }

}