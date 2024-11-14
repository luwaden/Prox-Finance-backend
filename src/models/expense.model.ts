import mongoose from "mongoose";
import { Schema, model, Document, CallbackError } from "mongoose";

export interface IExpense extends Document {
  title: string;
  amount: number;
  type: string;
  date: Date;
  category: string;
  description: string;
}

const ExpenseSchema = new Schema<IExpense>(
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
      default: "Expense",
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

ExpenseSchema.pre("save", async function (next) {
  const expense = this as IExpense;
});

const ExpenseModel = model<IExpense>("Expense", ExpenseSchema);

export default ExpenseModel;
