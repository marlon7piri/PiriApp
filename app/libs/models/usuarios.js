import { Restaurante } from "./restaurante";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
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
    restaurante_id: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
