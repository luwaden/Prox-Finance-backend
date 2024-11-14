import { Request, Response, NextFunction, RequestHandler } from "express";
import Expense from "../models/expense.model";

export interface expenseBody {
  title: string;
  amount: number;
  type: string;
  category: string;
  description: string;
}

export const addexpense: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { title, amount, category, description, type } =
    req.body as expenseBody;

  try {
    if (!title || !category || !description || !amount || !type) {
      res.status(400).json({
        status: "400",
        error: "Bad request",
        message: "title, category, description, and amount are required",
      });
      return;
    }

    const expense = new Expense({ title, amount, category, type, description });
    const savedexpense = await expense.save();
    console.log(savedexpense);

    res.status(200).json({ message: "expense added" });
  } catch (error) {
    console.log(error);
  }
};

export const getAllexpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    if (!expenses) {
      throw new Error("No notes found");
    }
    res.status(200).json({
      message: "expense rerieved successfully",
      data: expenses,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error retrieving expenses: ${err}`,
    });
  }
};

export const deleteexpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const expenseId = req.params.id;
  try {
    const deletedexpense = await Expense.findByIdAndDelete(expenseId);
    if (!deletedexpense) {
      throw new Error("invalid entry");
    }
    res.status(200).json({
      message: "expense deleted successfully",
      data: deletedexpense,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error deleting note:${err}`,
    });
  }
};
