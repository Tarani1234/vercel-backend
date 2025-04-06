import { Request, Response } from "express";
import bcrypt from "bcryptjs";
console.log('Before importing User model');
import User from "../models/user";
console.log('after importing User model');

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
       res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User created", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Invalid email or password" });
        return;
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid email or password" });
        return;
      }
  
      res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };


  export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Logout failed", error });
    }
  };
  