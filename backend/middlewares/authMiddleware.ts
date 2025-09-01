import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"
import prisma from '../utils/prisma';

interface CustomJwtPayload extends JwtPayload {
  id: number;
}


export const requireAuth = async (req:Request, res:Response, next:NextFunction)=>{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(400).json({autherr: "no token"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as CustomJwtPayload; 
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            }
        })
        if(!user){
            res.status(400).json({autherr: "user not found"});
        } else {
            const temp = {id: user?.id, email: user?.email, username: user?.username};
            req.user = temp;
            next();
        }
    } catch(e){
        console.log(e);
        return res.status(401).json({autherr: "bad token"});
    }
}