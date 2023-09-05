import { NextFunction, Request, Response } from "express";
import Partner from "../../model/PartnerModel.js";

interface MyCustomRequest extends Request {
  id?: string;
}

export const partnerBlocked = async (
  req: MyCustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await Partner.findOne({ _id: req.id });
    if(user?.is_blocked) {
     return res.status(400).json({ message: "You are blocked" });
  }
      
    next()
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};