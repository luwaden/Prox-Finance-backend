import mongoose from "mongoose";
import { Schema, model, Document, CallbackError } from "mongoose";

export interface IIncome extends Document {
  title: string;
  amount: number;
  type: string;
  date: Date;
  category: string;
  description: string;
}
const IncomeSchema = new Schema<IIncome>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: "income",
    },

    category: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

IncomeSchema.pre("save", async function (next) {
  const income = this as IIncome;
});

const IncomeModel = model<IIncome>("Income", IncomeSchema);

export default IncomeModel;
