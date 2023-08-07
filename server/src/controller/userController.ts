import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { OAuth2Client,TokenPayload } from "google-auth-library";
import User from "../model/UserModel.js";
import Partner from "../model/PartnerModel.js";
import jwt, { JwtPayload }  from "jsonwebtoken";

// type gdata = 
//   {
//     iss: string,
//     azp: string,
//     aud: string,
//     sub: string,
//     email: string,
//     email_verified: boolean,
//     nbf: number,
//     name: string,
//     picture: string,
//     given_name: string,
//     family_name: string,
//     locale: string,
//     iat: number,
//     exp: number,
//     jti: string
// }
const jwtSecretKey = process.env.JWT_SECRET_KEY;

interface DecodedToken extends JwtPayload {
  userId: string;
}

interface MyCustomRequest extends Request {
  id: string; 
}


export const signup = async (req: Request, res: Response) => {
  console.log(req.body);
  
  const { name, email, password, contactNumber } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!! Login" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      contactNumber
    });
    await newUser.save();

    res.status(201).json({ message: "Signup successful",newUser });
  } catch (error) {
    console.error("Error during signup", error);
    res.status(500).json({ message: "Error during signup" });
  }
};

export const googleVerify = async (req: Request, res: Response) => {
  console.log(1);
  console.log(req.body);
  try{
  const { clientId, credential } = req.body;
  console.log(clientId);
  console.log(credential);
  
  const client = new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: clientId,
  });
  const payload: Partial<TokenPayload> | undefined = ticket.getPayload();
  const email = payload?.email
  console.log(payload);
  // res.json({payload})
  
  const existingUser = await User.findOne({ email });
 
  if(existingUser) {
    console.log(12121);
    console.log(existingUser);
    return res.status(200).json({message:"success",user:existingUser})
  }

  const newUser = new User({
    name:payload?.name,
    email:payload?.email,
    picture:payload?.picture
  });
  await newUser.save();
  return res.status(201).json({ message: "Signup successful",user:newUser });
}catch(error) {
  // console.error("Error during login", error);
  // res.status(500).json({ message: "Error during signup" });
}
  
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email,is_admin:0 }) 

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password || "");
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
      expiresIn: "35s",
    });

    console.log("Generated Token \n",token);

    if(req.cookies[`${user._id}`]) {
        req.cookies[`${user._id}`] = ""
    }

    res.cookie(String(user._id),token, {
        path: '/',
        expires: new Date(Date.now() + 1000*30),
        httpOnly : true,
        sameSite:'lax'
    })

    res.status(200).json({ message: "Successfully logged in", token, user });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ message: "Error during login" });
  }
};

const verifyToken = (req: MyCustomRequest, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie || ''
  const token = cookies.split("=")[1]
  console.log(cookies);
  if(!cookies) {
      return res.status(404).json({message:'No token found'})
  }
  jwt.verify(String(token),jwtSecretKey, (err:jwt.VerifyErrors | null, user: any) => {
      if(err) {
         return res.status(400).json({message:"Invalid token"})
      }
      req.id = user?.userId
  })
  next()
}

const logOut = ( req: MyCustomRequest, res: Response ) => {
    res.status(200).cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: 'Logout Success'
    })
}

