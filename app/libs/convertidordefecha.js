export const convertidordefecha = (fecha)=>{
    const fechaConvertida = new Date(fecha).toLocaleString('es-ES',{
        day:'2-digit',
        month:'2-digit',
        year:'numeric'
    })
    return fechaConvertida;
}