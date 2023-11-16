import { NextFunction, Request, Response } from "express";
import User from "../../model/UserModel.js";

interface MyCustomRequest extends Request {
  id?: string;
}

export const verifyBlock = async (
  req: MyCustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ _id: req.id });
    if(user?.is_blocked) {
     return res.status(400).json({ message: "You are blocked.In case you need any help mail us at petcare.help@petcare.in" });
  }
      
    next()
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
