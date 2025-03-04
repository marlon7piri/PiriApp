import mongoose from "mongoose";
import { Receta } from "./recetas";

const SchemaItem = new mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true,
    },
    descripcion: {
      type: String,
      default: "",
    },
    ingredientes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receta",
      },
    ],
    precio: {
      type: Number,
      require: true,
    },
    restaurante_id: {
      type: String,
      require: true,
    },
    visible: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Item = mongoose.models?.Item || mongoose.model("Item", SchemaItem);
