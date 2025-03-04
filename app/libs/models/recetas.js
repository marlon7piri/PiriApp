import { mongoose } from "mongoose";
import { Products } from "./productos";

const RecetaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true,
    },
    restaurante_id: {
      type: String,
      require: true,
    },
    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        cantidad: {
          type: Number,
          require: true,
        },
      },
    ],
    costo: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Receta =
  mongoose.models?.Receta || mongoose.model("Receta", RecetaSchema);
