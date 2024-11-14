import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/auth.model";

export interface IUser extends Document {
  _id: any;
  email: string;
  password: string;
  user: string;
  phoneNumber?: number;
}

export interface RegisterRequestBody {
  email: string;
  password: string;
  userName: string;
  phoneNumber: number;
}

export const userRegister: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, userName, phoneNumber } =
    req.body as RegisterRequestBody;

  if (!email) {
    res.status(400).json({
      status: "400",
      error: "Bad request",
      message: "email is required",
    });
    return;
  }

  if (!password) {
    res.status(400).json({
      status: "400",
      error: "Bad request",
      message: "password, is required",
    });
    return;
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        error: true,
        message:
          "A user with this email already exists. Please log in or use a different email.",
      });
      return;
    }

    // Create the new user
    await User.create({
      email,
      password,
      userName,
      phoneNumber,
    });

    res.status(201).json({
      message: "A new user successfully created",
      data: { email, userName },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const userLogin: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: true, message: "Invalid password" });
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res
        .status(500)
        .json({ error: true, message: "JWT_SECRET is not defined" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).json({
      error: false,
      data: { token },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};
