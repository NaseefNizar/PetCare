import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import User from "../model/UserModel.js";
import Partner from "../model/PartnerModel.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { handleUpload } from "../middleware/cloudinary/cloudinary.js";

import pkg from "twilio";
const { Twilio } = pkg;

const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } =
  process.env;
// if (!TWILIO_SERVICE_SID || !TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
//   throw new Error("Twilio environment variables are not defined.");
// }
const client = new Twilio(TWILIO_ACCOUNT_SID as string, TWILIO_AUTH_TOKEN as string);
const jwtSecretKey = process.env.JWT_SECRET_KEY;

interface DecodedToken extends JwtPayload {
  userId: string;
}

export interface MyCustomRequest extends Request {
  id?: string;
  rawBody?: Buffer;
}


export const existingUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, contactNumber } = req.body;
  const existingUser = await User.findOne({
    $or: [{ email }, { contactNumber }],
  });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  next();
};

export const signup = async (req: Request, res: Response) => {
  console.log("next");
  const { userId, email, password, contactNumber } = req.body;
  try {
    // const existingUser = await User.findOne({ email, contactNumber });
    // if (existingUser) {
    //   return res.status(409).json({ message: "User already exists!! Login" });
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userId,
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
  try {
    const { clientId, credential } = req.body;
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload: Partial<TokenPayload> | undefined = ticket.getPayload();
    const email = payload?.email;
    console.log(payload);
    const user = await User.findOne({ email });
    if (!user) {
      const user = new User({
        firstName: payload?.name,
        email: payload?.email,
        picture: payload?.picture,
      });
      await user.save();
      const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
        expiresIn: "1d",
      });
      res
        .status(201)
        .json({ message: "Signup successful", user })
        .cookie("token", token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60),
          httpOnly: true,
          sameSite: "lax",
        });
    } else {
      const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
        expiresIn: "1d",
      });
      // res.cookie(String(user._id), token, {
      res.cookie("token", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60),
        httpOnly: true,
        sameSite: "lax",
      });
      res.status(201).json({ message: "Signup successful", user });
    }
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
    // const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
    //   expiresIn: "1d",
    // });
    const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
      expiresIn: "1d",
    });

    console.log("Generated Token \n", token);

    // if (req.cookies[`${user._id}`]) {
    //   req.cookies[`${user._id}`] = "";
    // }

    // res.cookie(String(user._id), token, {
    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({ message: "Successfully logged in", token, user });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ message: "Error during login" });
  }
};

export const verifyToken = (
  req: MyCustomRequest,
  res: Response,
  next: NextFunction
) => {
  const cookies: string | undefined = req.cookies.token;
  if (!cookies) {
    return res.status(404).json({ message: "No token found" });
  }
  const token: string = req.cookies.token;
  console.log(token);

  jwt.verify(String(token), jwtSecretKey, (err: any, user: any) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }
    req.id = user.userId;
  });
  next();
};

export const logout = (req: MyCustomRequest, res: Response) => {
  try {
    // res.clearCookie(String(req.id));
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Error during logout", error);
    res.status(500).json({ message: "Error during logout" });
  }
};

export const getData = async (req: MyCustomRequest, res: Response) => {
  try {
    const userData = await User.findById({ _id: req.id });
    // console.log(userData);
    res.status(200).json({ userData });
  } catch (error) {
    console.error("Error getting user data:", error);
    res.status(500).json({ message: "Error getting user data" });
  }
};

export const updateUser = async (req: MyCustomRequest, res: Response) => {
  try {
    console.log("update", req.body);
    console.log("id", req.id);

    const { firstName, lastName, contactNumber, email } = req.body;
    const userData = await User.findByIdAndUpdate(req.id, {
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

export const updateProfilePic = async (req: MyCustomRequest, res: Response) => {
  try {
    console.log("files", req.file);

    if (req.file) {
      const imagePath = req.file.filename;
      const userData = await User.findByIdAndUpdate(req.id, {
        $set: {
          picture: `http://localhost:8000/users/${imagePath}`,
        },
      });

      res.status(200).json({ message: "Updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user data" });
  }

  // try {
  //   const b64 = Buffer.from(req.file?.buffer).toString("base64");
  //   let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  //   const cldRes = await handleUpload(dataURI);
  //   console.log(cldRes);
  //     const userData = await User.findByIdAndUpdate(req.id, {
  //   $set: {
  //     picture: cldRes.secure_url,
  //   },
  // });

  //   res.status(200).json({ message: "Updated successfully" });

  // res.json(cldRes);
  // } catch (error) {
  //   console.log(error);
  //   res.send({
  //     message: error.message,
  //   });
  // }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contactNumber } = req.body;
  const existingUser =
    (await User.findOne({ contactNumber })) ||
    (await Partner.findOne({ contactNumber }));

  if (!existingUser) {
    return res.status(409).json({ message: "User doesnt exist" });
  }
  next();
};

export const setNewPassword = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { password, contactNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user =
      (await User.findOneAndUpdate(
        { contactNumber },
        { password: hashedPassword }
      )) ||
      (await Partner.findOneAndUpdate(
        { contactNumber },
        { password: hashedPassword }
      ));
    // console.log(user);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
};

export const verifyPasswordOTP = async (req: Request, res: Response) => {
  const { contactNumber, otp } = req.body;
  console.log(contactNumber, otp);

  try {
    const verifiedResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID as string)
      .verificationChecks.create({
        to: `+91${contactNumber}`,
        code: otp,
      });
    // res.status(200).json({message:"otp verified successfully"})
    if (verifiedResponse.status === "approved") {
      console.log("verified");
      res.status(200).json({ message: "OTP verified succcessfully" });
    } else {
      res.status(409).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid OTP" });
  }
};

export const updateContact = async (req: MyCustomRequest, res: Response) => {
  const { contactNumber } = req.body;
  try {
    const userData = await User.findByIdAndUpdate(req.id, {
      $set: {
        contactNumber,
      },
    });
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user data" });
  }
};
