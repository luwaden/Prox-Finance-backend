import { Router } from "express";
import { userRegister, userLogin } from "../../../controllers/auth.controller";

const authRoute = Router();

authRoute.post("/signup", userRegister);
authRoute.post("/login", userLogin);

export default authRoute;
