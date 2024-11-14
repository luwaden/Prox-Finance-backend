import { Schema, model, Document, CallbackError } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  userName: string;
  phoneNumber?: number;
}

const userschema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  phoneNumber: { type: String, required: false },
});
