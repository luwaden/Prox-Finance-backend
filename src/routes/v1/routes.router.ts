import express, { Request, Response, NextFunction, Router } from "express";
import expenseRoute from "./routers/expense.route";
import incomeRoute from "./routers/income.routes";
import authRoute from "./routers/auth.routes";

const router = Router();

router.use("/expense", expenseRoute);
router.use("/income", incomeRoute);
router.use("/auth", authRoute);
export default router;
