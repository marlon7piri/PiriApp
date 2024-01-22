import mongoose from "mongoose";
import { Products } from "./productos";

const SchemaInventario = new mongoose.Schema(
  {
    fecha: {
      type: Date,
      required: true,
    },
    productos: {
      type:[Object],
      required: true,
    },
  },
  { timestamps: true }
);

export const Inventario =
  mongoose.models?.Inventario || mongoose.model("Inventario", SchemaInventario);
