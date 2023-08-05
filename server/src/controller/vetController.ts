import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { OAuth2Client,TokenPayload } from "google-auth-library";
import Partner from "../model/PartnerModel.js";
import jwt, { JwtPayload }  from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY;


export const signup = async (req: Request, res: Response) => {
    console.log(req.body);
    
    const { name, email, password, contactNumber } = req.body;
    try {
      const existingUser = await Partner.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists!! Login" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newPartner = new Partner({
        name,
        email,
        password: hashedPassword,
        contactNumber
      });
      await newPartner.save();
  
      res.status(201).json({ message: "Signup successful",newPartner });
    } catch (error) {
      console.error("Error during signup", error);
      res.status(500).json({ message: "Error during signup" });
    }
  };