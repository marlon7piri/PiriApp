export const convertidordefecha = (str)=>{
    return str.toString().replace("T"," ").substring(0,16)
}