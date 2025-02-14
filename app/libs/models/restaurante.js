import mongoose from "mongoose";
import {User} from './usuarios'
import {Products} from './productos'

const SchemaRestaurante = new mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true,
    },
    usuarios:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    productos:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
    }],
  },
  { versionKey: false }
);

export const Restaurante =
  mongoose.models?.Restaurante ||
  mongoose.model("Restaurante", SchemaRestaurante);
