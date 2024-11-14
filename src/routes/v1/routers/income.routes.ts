import { Router } from "express";
import { addIncome, deleteIncome } from "../controllers/income.contrller";
import { getAllIncome } from "../controllers/income.contrller";

const incomeRoute = Router();

incomeRoute.post("/income", addIncome);
incomeRoute.get("/income", getAllIncome);
incomeRoute.delete("/income/:id", deleteIncome);

export default incomeRoute;
