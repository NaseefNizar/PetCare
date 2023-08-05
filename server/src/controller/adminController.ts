import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";

const jwtSecretKey: string = process.env.JWT_SECRET_KEY


export const login = async (req: Request, res: Response) => {
        
    try {
      console.log(req.body);
      
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({ email, is_admin: 1 });
      console.log(user);
      
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password??"");
  
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
          }
          
          const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
            expiresIn: "35s",
          });
          
          
          if (req.cookies[`${user._id}`]) {
            req.cookies[`${user._id}`] = "";
          }
          
          res.cookie(String(user._id), token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: "lax",
          });
          
          res.status(200).json({ message: "Successfully logged in", user });
        }
    } catch (error) {
      console.error("Error during login", error);
      res.status(500).json({ message: "Error during login" });
    }
  };