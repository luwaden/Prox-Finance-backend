import { Request, Response, NextFunction, RequestHandler } from "express";
import Income from "../models/income.model";

export interface IncomeBody {
  title: string;
  amount: number;
  type: string;
  category: string;
  description: string;
}

export const addIncome: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { title, amount, category, description, type } = req.body as IncomeBody;

  try {
    if (!title || !category || !description || !amount || !type) {
      res.status(400).json({
        status: "400",
        error: "Bad request",
        message: "title, category, description, and amount are required",
      });
      return;
    }

    const income = new Income({ title, amount, category, type, description });
    const savedIncome = await income.save();
    console.log(savedIncome);

    res.status(200).json({ message: "income added" });
  } catch (error) {
    console.log(error);
  }
};

export const getAllIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const incomes = await Income.find().sort({ createdAt: -1 });
    if (!incomes) {
      throw new Error("No notes found");
    }
    res.status(200).json({
      message: "income rerieved successfully",
      data: incomes,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error retrieving incomes: ${err}`,
    });
  }
};

export const deleteIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const incomeId = req.params.id;
  try {
    const deletedIncome = await Income.findByIdAndDelete(incomeId);
    if (!deletedIncome) {
      throw new Error("invalid entry");
    }
    res.status(200).json({
      message: "Income deleted successfully",
      data: deletedIncome,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error deleting note:${err}`,
    });
  }
};
