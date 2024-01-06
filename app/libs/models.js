import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  address: {
    type: String,
  },
});

const ProductsSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
    },
    precio: {
      type: Number,
      required: true,
    },
    categoria: {
      type: String,
    },
    stock: {
      type: Number,
    
    },
    stock_min: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Products =
  mongoose.models.Products || mongoose.model("Products", ProductsSchema);
