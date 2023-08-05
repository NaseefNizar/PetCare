import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY;

interface DecodedToken extends JwtPayload {
    userId: string;
  }

  interface MyCustomRequest extends Request {
    id: string; 
  }
  


const refreshToken = async( req: MyCustomRequest,res: Response, next:NextFunction ) => {
    const cookies = req.headers.cookie || ''
    const prevToken = cookies.split("=")[1]
    if(!prevToken){
        return res.status(400).json({message:"Token not found"})
    }
    jwt.verify(String(prevToken),jwtSecretKey, (err, user) => {
        if(err) {
            console.log(err);
            return res.status(403).json({message:"Authentication failed"})
        }
        // res.clearCookie(`${user.id}`)
        // req.cookies[`${user.id}`] = ""    

        // const token = jwt.sign({ userId: user.id }, jwtSecretKey, {
        //     expiresIn: "35s",
        //   });

        const decodedToken = user as DecodedToken;
        res.clearCookie(decodedToken.userId);
        req.cookies[decodedToken.userId] = '';
    
        const token = jwt.sign({ userId: decodedToken.userId }, jwtSecretKey, {
          expiresIn: '35s',
        });
          
          console.log("Regenerated Token \n", token); 

        //   res.cookie(String(user.id),token, {
          res.cookie(decodedToken.userId,token, {
            path: '/',
            expires: new Date(Date.now() + 1000*30),
            httpOnly : true,
            sameSite:'lax'
        })

        // req.id = user.id
        req.id = decodedToken.userId
        next();
    })
}