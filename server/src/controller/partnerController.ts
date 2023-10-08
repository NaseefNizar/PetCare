import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { OAuth2Client,TokenPayload } from "google-auth-library";
import Partner from "../model/PartnerModel.js";
import jwt, { JwtPayload }  from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY;

import pkg from "twilio";
import Kyc from "../model/kycModel.js";
const { Twilio } = pkg;

const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } =
  process.env;

if (!TWILIO_SERVICE_SID || !TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
  throw new Error("Twilio environment variables are not defined.");
}

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

interface MyCustomRequest extends Request {
  id?: string;
  files?: {
    poi?: Express.Multer.File[]; // Use Express Multer's File type or your custom File type
    poq?: Express.Multer.File[]; // Use Express Multer's File type or your custom File type
    photo?: Express.Multer.File[]; // Use Express Multer's File type or your custom File type
  };
}


export const existingUser = async (req: Request, res: Response, next: NextFunction) => {
  
  const { email , contactNumber } = req.body
  const existingUser = await Partner.findOne({
    $or: [{ email }, { contactNumber }],
  });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  next()
};


export const signup = async (req: Request, res: Response) => {
    console.log(req.body);
    
    const { firstName, email, password, contactNumber,role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newPartner = new Partner({
        firstName,
        email,
        password: hashedPassword,
        contactNumber,
        role
      });
      await newPartner.save();
  
      res.status(201).json({ message: "Signup successful",newPartner });
    } catch (error) {
      console.error("Error during signup", error);
      res.status(500).json({ message: "Error during signup" });
    }
  };

  export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
      const user = await Partner.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (user.is_blocked) {
        return res.status(401).json({ message: "Blocked by admin" });
      }
      
  
      const passwordMatch = await bcrypt.compare(password, user.password || "");
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
        expiresIn: "1d",
      });
  
      console.log("Generated Token \n",token);
  
      // if(req.cookies[`${user._id}`]) {
      //     req.cookies[`${user._id}`] = ""
      // }
  
      // res.cookie(String(user._id),token, {
      res.cookie('token',token, {
          path: '/',
          expires: new Date(Date.now() + 1000*60*60),
          httpOnly : true,
          sameSite:'lax'
      })
  
      res.status(200).json({ message: "Successfully logged in", token, user });
    } catch (error) {
      console.error("Error during login", error);
      res.status(500).json({ message: "Error during login" });
    }
  };


  export const logout = async (req: MyCustomRequest, res: Response) => {
    try {
  
      res.clearCookie(String(req.id))
      res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
      console.error("Error during logout", error);
      res.status(500).json({ message: "Error during logout" });
    }
  };

  export const verifyToken = (req: MyCustomRequest, res: Response, next:NextFunction) => {
    // const cookies: string | undefined = req.headers.cookie;
    const cookies: string | undefined = req.cookies.token;
    console.log('hdjjh',req.cookies);
    
    if (!cookies) {
      return res.status(404).json({ message: "No token found" });
    }
    // const token: string = cookies.split("=")[1];
    const token: string = req.cookies.token;
    
    jwt.verify(String(token), jwtSecretKey, (err:any, user:any) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }
      // console.log('jwt',user);
      
      req.id = user.userId;
    });
    next();
  };


  export const getPartnerData = async (req: MyCustomRequest, res: Response) => {
    try {
      const partnerData = await Partner.findById({ _id: req.id });
      return res.status(200).json({partnerData})
    } catch (error) {
      res.status(500).json({ message: "Error getting data"})
    }
  }


  export const updatePartner = async (req: MyCustomRequest, res: Response) => {
    try {
      console.log("update", req.body);
      console.log("id", req.id);
  
      const { firstName, lastName, contactNumber, email } = req.body;
      const userData = await Partner.findByIdAndUpdate(req.id, {
        $set: {
          firstName,
          lastName,
          email,
          contactNumber,
        },
      });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating user data" });
    }
  };


  export const updatePartnerProfilePic = async (req: MyCustomRequest, res: Response) => {
    try {
      console.log("files", req.file);
  
      if (req.file) {
        const imagePath = req.file.filename;
        const userData = await Partner.findByIdAndUpdate(req.id, {
          $set: {
            picture: `http://localhost:8000/users/${imagePath}`,
          },
        });
  
        res.status(200).json({ message: "Updated successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user data" });
    }
  }; 

  export const forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { contactNumber } = req.body;
    const existingUser = await Partner.findOne({contactNumber});
  
    if (!existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    next();
  };

  export const setNewPassword = async( req: Request, res: Response) => {
    try {
      console.log(req.body);
      
      const { password,contactNumber } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await Partner.findOneAndUpdate({contactNumber},{password:hashedPassword})
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating password" });
    }
  
  }

  export const verifyPasswordOTP = async (
    req: Request,
    res: Response,
  ) => {
    const { contactNumber, otp } = req.body;
    console.log(contactNumber, otp);
  
    try {
      const verifiedResponse = await client.verify.v2
        .services(TWILIO_SERVICE_SID)
        .verificationChecks.create({
          to: `+91${contactNumber}`,
          code: otp,
        });
      // res.status(200).json({message:"otp verified successfully"})
      if (verifiedResponse.status === "approved") {
        console.log("verified");
        res.status(200).json({message:"OTP verified succcessfully"})
      } else {
        res.status(409).json({ message: "Invalid OTP" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid OTP" });
    }
  };


  export const kycUpdate = async(req: MyCustomRequest, res: Response) => {
    try {
      const poi = req.files.poi?.[0]?.filename
        const poq = req.files.poq?.[0]?.filename
        const photo = req.files.photo?.[0]?.filename
      const {...data} = req.body
      console.log(req.body.firstName);
      console.log(req.id);
      const kycData = new Kyc({
        ...data,
        poi:`http://localhost:8000/users/${poi}`,
            poq:`http://localhost:8000/users/${poq}`,
            photo:`http://localhost:8000/users/${photo}`,
      })
      
      await kycData.save()
      const partnerData = await Partner.findByIdAndUpdate(req.id,{$set:{
        kycDataId:kycData._id,
        is_kycSubmitted:true
      }})
      res.status(200).json({ message: "Updated successfully" });

    } catch (error) {
      res.status(500).json({ message: "Error updating kyc data" });
    }
  }

  export const kycDocumentUpload = async (req: MyCustomRequest, res: Response) => {
    try {
      console.log("files", req.files);
      if (req.files) {
        const poi = req.files.poi?.[0]?.filename
        const poq = req.files.poq?.[0]?.filename
        const photo = req.files.photo?.[0]?.filename
        console.log(poi);
        
        const userData = await Partner.findById(req.id)

        const kycId = userData?.kycDataId.toHexString()
        console.log(kycId);
        
        const kycData = await Kyc.findByIdAndUpdate(kycId,{
          $set:{
            poi:`http://localhost:8000/users/${poi}`,
            poq:`http://localhost:8000/users/${poq}`
          }
        })
        console.log(kycData);
        
  
        res.status(200).json({ message: "Updated successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user data" });
    }
  }; 


  export const addSlot = async( req: MyCustomRequest, res:Response) => {
    try {
      console.log(req.body);
      console.log(req.id);
      
      const userId = req.id
      const update = await Partner.findOneAndUpdate({_id:userId},{$push:{availableSlots:req.body}})
      res.status(200).json({ message: "Slot added successfully" });

    } catch (error) {
      res.status(500).json({ message: "Error adding slots" });
    }

  }