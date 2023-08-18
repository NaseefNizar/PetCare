import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import User from "../model/UserModel.js";
import Partner from "../model/PartnerModel.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserData } from "./adminController.js";

const jwtSecretKey = process.env.JWT_SECRET_KEY;

interface DecodedToken extends JwtPayload {
  userId: string;
}

interface MyCustomRequest extends Request {
  id?: string;
}

export const existingUser = async (req: Request, res: Response, next: NextFunction) => {
  
  const { email , contactNumber } = req.body
  const existingUser = await User.findOne({
    $or: [{ email }, { contactNumber }],
  });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  next()
};


export const signup = async (req: Request, res: Response) => {
  console.log('next');
  const { firstName, email, password, contactNumber } = req.body;
  try {
    // const existingUser = await User.findOne({ email, contactNumber });
    // if (existingUser) {
    //   return res.status(409).json({ message: "User already exists!! Login" });
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      email,
      password: hashedPassword,
      contactNumber,
    });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", newUser });
  } catch (error) {
    console.error("Error during signup", error);
    res.status(500).json({ message: "Error during signup" });
  }
};

export const googleVerify = async (req: Request, res: Response) => {
  console.log(1);
  console.log(req.body);
  try {
    const { clientId, credential } = req.body;
    console.log(clientId);
    console.log(credential);

    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload: Partial<TokenPayload> | undefined = ticket.getPayload();
    const email = payload?.email;
    console.log(payload);
    // res.json({payload})

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log(12121);
      console.log(existingUser);
      return res.status(200).json({ message: "success", user: existingUser });
    }

    const newUser = new User({
      name: payload?.name,
      email: payload?.email,
      picture: payload?.picture,
    });
    await newUser.save();
    
    return res
      .status(201)
      .json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Error during signup", error);
    res.status(500).json({ message: "Error during signup" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email, is_admin: 0 });
    console.log(user);

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

    console.log("Generated Token \n", token);

    // if (req.cookies[`${user._id}`]) {
    //   req.cookies[`${user._id}`] = "";
    // }

    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 *60),
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({ message: "Successfully logged in", token, user });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ message: "Error during login" });
  }
};



export const verifyToken = (req: MyCustomRequest, res: Response, next:NextFunction) => {
  const cookies: string | undefined = req.headers.cookie;
  // console.log(req.body);
  
  // console.log(1);
  // console.log(cookies);
  if (!cookies) {
    return res.status(404).json({ message: "No token found" });
  }
  const token: string = cookies.split("=")[1];
  // console.log(cookies.split("=")[0]);
  
  jwt.verify(String(token), jwtSecretKey, (err:any, user:any) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }
    // console.log('jwt',user);
    
    req.id = user.userId;
  });
  next();
};



export const logout = (req: MyCustomRequest, res: Response) => {
  try {
    res.clearCookie(String(req.id))
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Error during logout", error);
    res.status(500).json({ message: "Error during logout" });
  }
};



export const getData = async( req:MyCustomRequest, res:Response ) => {
  try {
    const userData = await User.findById({_id : req.id });
    // console.log(userData);
    res.status(200).json({userData})
  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ message: 'Error getting user data' });
  }
} 

export const updateUser = async( req: MyCustomRequest, res:Response ) => {
  try{
    console.log('update',req.body);
    console.log('id',req.id);
    
    const { firstName, lastName, contactNumber, email } = req.body
    const userData = await User.findByIdAndUpdate(req.id,{$set:{
      firstName,
      lastName,
      email,
      contactNumber
    }})
    res.status(200).json({message:"Updated successfully"})
  }
  catch ( error ) {
    res.status(500).json({ message: 'Error updating user data' });
  }
}



export const updateProfilePic = async( req: MyCustomRequest, res:Response ) => {
  try {
    console.log('files',req.file);
    
    if(req.file){
    const imagePath = req.file.filename;
    const userData = await User.findByIdAndUpdate(req.id,{$set:{
      picture: `http://localhost:8000/users/${imagePath}`
    }})

  res.status(200).json({message:"Updated successfully"})
    }
}catch ( error ) {
  res.status(500).json({ message: 'Error updating user data' });
}
}





