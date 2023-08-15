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
  const { name, email, password, contactNumber } = req.body;
  try {
    // const existingUser = await User.findOne({ email, contactNumber });
    // if (existingUser) {
    //   return res.status(409).json({ message: "User already exists!! Login" });
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
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

// export const verifyToken = (
//   req: MyCustomRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const cookies = req.headers.cookie || "";
//   const token = cookies.split("=")[1];
//   console.log(cookies);
//   if (!cookies) {
//     return res.status(404).json({ message: "No token found" });
//   }
//   jwt.verify(
//     String(token),
//     jwtSecretKey,
//     (err: jwt.VerifyErrors | null, user: any) => {
//       if (err) {
//         return res.status(400).json({ message: "Invalid token" });
//       }
//       req.id = user?.userId;
//     }
//   );
//   next();
// };

export const verifyToken = (req: MyCustomRequest, res: Response, next:NextFunction) => {
  const cookies: string | undefined = req.headers.cookie;
  console.log(1);
  console.log(cookies);
  if (!cookies) {
    return res.status(404).json({ message: "No token found" });
  }
  const token: string = cookies.split("=")[1];
  console.log(cookies.split("=")[0]);
  
  jwt.verify(String(token), jwtSecretKey, (err:any, user:any) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }
    console.log(user);
    
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
    const userData = await User.find({_id : req.id });
    res.status(200).json({userData})

  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ message: 'Error getting user data' });
  }
} 
