import jwt, { Secret } from "jsonwebtoken";
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import prisma from '../utils/prisma';

const tokenAge = 3*24*60*60; //3days

const createToken = (id:Number)=>{
    return jwt.sign({id}, process.env.JWT_SECRET as Secret, {
        expiresIn: tokenAge,
    })
}

const hash = async (pwd:string):Promise<string>=>{
    const saltRounds = 11;
    try{
        const hashedPwd = bcrypt.hash(pwd, saltRounds);
        return hashedPwd;
    } catch(e){
        throw e;
    }
}

const check = async (enteredPwd:string, originalPwd:string):Promise<boolean>=>{
    const res:boolean = await bcrypt.compare(enteredPwd, originalPwd);
    return res;
}

export const signup = async (req: Request, res:Response)=>{
    const {uname, email, pwd} = req.body;
    try{
        const hashedPwd = await hash(pwd);
        const user = await prisma.user.create({
          data:{
                username: uname,
                email: email,
                password: hashedPwd,
            },
         });
         const token = createToken(user.id);
         res.cookie('jwt', token, { 
            httpOnly:true, 
            maxAge: tokenAge*1000, //as maxAge expects time in ms
            //secure: true,
            //sameSite: 'none',
            //partitioned: true,
        });
        res.status(201).json({user: user.id});
    } catch (e){
        console.log("Signup error");
        console.log(e);
        res.status(400).json({e});
    }
}

export const login = async (req: Request, res:Response)=>{
    const {email, pwd} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if(user){
            if(!await check(pwd, user.password)){
                throw new Error("Invalid Email or Password.");
            }
            const token = createToken(user.id);
            res.cookie('jwt', token, { 
                httpOnly:true, 
                maxAge: tokenAge*1000, 
                //enable later once deployed
                //secure: true,
                //sameSite: 'none',
                //partitioned: true,
            });
            res.status(201).json({user: user.id});
        } else {
            throw new Error("Invalid email or password.");
        }

    } catch (e){
        console.log("Login error");
        console.log(e);
        res.status(400).json({e});
    }

}

export const logout = async (req: Request, res:Response)=>{
    try{
        await prisma.$disconnect();
        res.cookie('jwt', "", { 
                httpOnly:true, 
                maxAge: 1, 
                //secure: true,
                //sameSite: 'none',
                //partitioned: true,
        });
        res.status(200).json({user: null});
    } catch (e){
        console.log("logout error");
        console.log(e);
        res.status(400).json({e});
    }
}

