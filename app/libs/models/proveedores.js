import mongoose from "mongoose";

const ProveedoresSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  }, email: {
    type: String,
    required: true,
  }, telefono: {
    type: String,
    required: true,
  }, direccion: {
    type: String,
    required: true,
  },
  restaurante_id: {
    type: String,
    required: true

  }
}, {
  timestamps: true
});

export const Proveedor =
  mongoose.models?.Proveedor || mongoose.model("Proveedor", ProveedoresSchema);
