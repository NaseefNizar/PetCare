import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
import Partner from "../model/PartnerModel.js";
import Kyc from '../model/kycModel.js'
import Appointment from "../model/appointmentModel.js";

const jwtSecretKey: string = process.env.JWT_SECRET_KEY

interface MyRequest extends Request {
  id?: string;
}

export const login = async (req: Request, res: Response) => {
        
    try {
      const email: string = req.body.email;
      const password: string = req.body.password;
      const user = await User.findOne({ email, is_admin: 1 });      
      if (user) {
        const passwordMatch: boolean = await bcrypt.compare(password, user.password??"");
  
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
          }
          
          const token: string = jwt.sign({ userId: user._id }, jwtSecretKey, {
            expiresIn: "1d",
          });
          
          // if (req.cookies[`${user._id}`]) {
          //   req.cookies[`${user._id}`] = "";
          // }
          
          // res.cookie(String(user._id), token, {
          res.cookie('token', token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60),
            httpOnly: true,
            sameSite: "lax",
          });
          

          res.status(200).json({ message: "Successfully logged in", user,token });
        }
    } catch (error) {
      console.error("Error during login", error);
      res.status(500).json({ message: "Error during login" });
    }
  };

  export const logout = (req: MyRequest, res: Response) => {
    try {
      // Clear the user's token by sending an expired token
      console.log('logout');
      
      // res.cookie(String(req.id), "", {
      //   path: "/",
      //   expires: new Date(0),
      //   httpOnly: true,
      //   sameSite: "lax",
      // });
      res.clearCookie(String(req.id))
  
      res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
      console.error("Error during logout", error);
      res.status(500).json({ message: "Error during logout" });
    }
  };

  
export const verifyToken = (req: MyRequest, res: Response, next:NextFunction) => {
    // const cookies: string | undefined = req.headers.cookie;
    const cookies: string | undefined = req.cookies.token;
    console.log(cookies);
    if (!cookies) {
      return res.status(404).json({ message: "No token found" });
    }
    // const token: string = cookies.split("=")[1];
    const token: string = req.cookies.token;
    
    jwt.verify(String(token), jwtSecretKey, (err:any, user:any) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }
      console.log(user);
      
      req.id = user.userId;
    });
    next();
  };


export const getUserData = async( req:Request, res:Response ) => {
  try {
    const userData = await User.find({ is_admin: 0 });
    res.status(200).json({userData})

  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ message: 'Error getting user data' });
  }
}  


export const userAccess = async( req: Request, res: Response) => {
  try{
    const { userId,is_blocked } = req.body
    console.log(req.body);
    
    const user = await User.findOneAndUpdate({ _id: userId },{
      $set: {
        is_blocked
      }
    })
    const userData = await User.find({is_admin:0})
    res.status(200).json({userData})
   } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).json({ message: 'Error blocking user' });
  }
}

export const getPartnerData = async( req:Request, res:Response ) => {
  try {
    const partnerData = await Partner.find({is_verified:true });
    res.status(200).json({partnerData})

  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ message: 'Error getting user data' });
  }
} 


export const getUnverifiedPartner = async( req:Request, res:Response ) => {
  try {
    const unverifiedPartners = await Partner.find({is_verified: false,is_kycSubmitted: true });    
    res.status(200).json({unverifiedPartners})
  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ message: 'Error getting user data' });
  }
} 


export const individualPartnerData = async (req:Request, res:Response) => {
  try {
    console.log(req.body);
    const partnerData = await Partner.findOne({_id:req.body.id})
    console.log(partnerData);

    res.status(200).json({partnerData})
  } catch (error) {
    res.status(500).json({ message: 'Error getting partner data' });
  }
}


export const partnerApproval = async( req:Request, res:Response) => {
  try{
    const { partnerId } = req.body
    console.log(req.body);
    
    const partner = await Partner.findByIdAndUpdate(partnerId,{
      $set:{
        is_verified: true
      }
    })
    res.status(200).json({message: "Successfull"})
  } catch(error) {
    res.status(500).json({message: "Error approving partner"})
  }
}


export const partnerAccess = async( req: Request, res: Response) => {
  try{
    const { partnerId,is_blocked } = req.body
    console.log(req.body);
    const user = await Partner.findOneAndUpdate({ _id: partnerId },{
      $set: {
        is_blocked
      }
    })
    const partnerData = await Partner.find({})
    res.status(200).json({partnerData})
   } catch (error) {
    console.error('Error blocking partner:', error);
    res.status(500).json({ message: 'Error blocking partner' });
  }
}

export const getDashboardData = async(req:MyRequest, res:Response) => {
  try {
      
      const appointments = await Appointment.find({})
      console.log(appointments);
      res.status(200).json({appointments})
  } catch (error) {
      res.status(500).json({message:"Error getting data"})
  }
}

export const getallappointments = async(req:MyRequest, res:Response) => {
  try {
      
    const appointments = await Appointment.find({}).populate('partnerId').populate('userId')
    console.log(appointments);
    res.status(200).json({appointments})
} catch (error) {
    res.status(500).json({message:"Error getting data"})
}
}