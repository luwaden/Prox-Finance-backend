import express, { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import ENV from "../utils/env.utils";
import { ENVType } from "../utils/enums.utils";
import ErrorResponse from "../utils/error.utils";
import errorHandler from "../middleware/error.mw";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import path from "path";
import expressSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import userAgent from "express-useragent";

config();
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(errorHandler);

export default app;
