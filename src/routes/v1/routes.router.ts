import express, { Request, Response, NextFunction, Router } from "express";
import expenseRoute from "./routers/expense.route";
import incomeRoute from "./routers/income.routes";

const router = Router();

router.use("/expense", expenseRoute);
router.use("/income", incomeRoute);

export default router;
