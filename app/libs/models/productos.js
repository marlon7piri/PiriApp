import { Restaurante } from "./restaurante";
import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
    },
    precio_por_unidad: {
      type: Number,
      required: true,
    },
    presentacion_por_unidad: {
      type: Number,
      required: true,
    },
    costo: {
      type: Number,
      required: true,
    },
    itbms: {
      type: Number,
      required: true,
    },
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Area',
      required:true
    },
    unidad: {
      type: String,
    },
    proveedor: {
      type: String,
    },
    mas_vendido: {
      type: Boolean,
    },
    stock: {
      type: Number,
    },
    stock_min: {
      type: Number,
    },
    restaurante_id:{
      type:String,
      required:true
     
    }
  
  },
  { timestamps: true }
);

export const Products =
  mongoose.models?.Products || mongoose.model("Products", ProductsSchema);
