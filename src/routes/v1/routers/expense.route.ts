import { Router } from "express";
import {
  addexpense,
  getAllexpense,
  deleteexpense,
} from "../controllers/expenses.controller";

const expenseRoute = Router();

expenseRoute.post("/expense", addexpense);
expenseRoute.get("/expense", getAllexpense);
expenseRoute.delete("/expense/:id", deleteexpense);

export default expenseRoute;
