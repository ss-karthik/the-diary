import { Request, Response } from "express"

export const homepage = (req: Request, res:Response)=>{
    res.send("Hello - Not authenticated");
}