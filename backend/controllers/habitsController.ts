import { Request, Response } from "express"
import prisma from '../utils/prisma';

export const createHabit = async(req:Request, res: Response)=>{
    const {title, tags, frequency, streak} = req.body;
    const userid = req.user?.id;
    try {
        const habit = await prisma.habit.create({
            data: {
                title: title,
                tags: tags,
                frequency: frequency,
                streak: streak,
                author: {
                    connect: {
                        id: userid,
                    }
                }    
            }
        });
        res.status(201).json({habit: habit});

    } catch(e){
        console.log(e);
        console.log('habit creation error');
        res.status(400).json({e});
    }
}

export const updateHabit = async(req:Request, res:Response)=>{
    const {title, tags, frequency, habitid} = req.body;
    try {
        const habit = await prisma.habit.update({
            where: {
                id: habitid,
            },
            data: {
                title: title,
                tags: tags,
                frequency: frequency,
            }
        });
        res.status(201).json({habit: habit});
    } catch(e){
        console.log(e);
        console.log('habit updation error');
        res.status(400).json({e});
    }
}

export const deleteHabit = async(req:Request, res:Response)=>{
    const {habitid} = req.body;
    try {
        const habit = await prisma.habit.delete({
            where: {
                id: habitid,
            },
        });
        res.status(201).json({habit: habit});
    } catch(e){
        console.log(e);
        console.log('habit deletion error');
        res.status(400).json({e});
    }
}

export const getHabitById = async(req: Request, res:Response)=>{
    const userid = req.user?.id;
    const {habitid} = req.body;
    try{
        const habit = await prisma.habit.findUnique({
            where: {
                authorId: userid,
                id: habitid,
            },
        });
        res.status(201).json({habitdata: habit});
    } catch(e){
        console.log(e);
        console.log('habit fetch error');
        res.status(400).json({e});
    }
}

export const getAllHabits = async(req:Request, res:Response)=>{
    const userid = req.user?.id;
    try {
        const habits = await prisma.habit.findMany({
            where: {
                authorId: userid,
            },
        });
        res.status(201).json({habitdata: habits});
    } catch(e){
        console.log(e);
        console.log('habit updation error');
        res.status(400).json({e});
    }
}

export const getAllLogs = async(req:Request, res: Response)=>{
    const {habitid} = req.body;
    try{
        const logdata = await prisma.habitLog.findMany({
            where: {
                habitId: habitid,
            }
        });
        res.status(201).json({logdata: logdata});
    } catch (e){
        console.log(e);
        console.log('error logging habit');
        res.status(400).json({e});
    }
}

export const getTodaysLog = async(req:Request, res: Response)=>{
    const {habitid} = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try{
        const logdata = await prisma.habitLog.upsert({
            where: {
                habitId_dateCreated: {
                    habitId: habitid,
                    dateCreated: today,
                }
            }, 
            update: {},
            create: {
                completed: false,
                notes: "",
                dateCreated: today, 
                habit: {
                    connect: {
                        id: habitid,
                    }
                }
            }
        });
        res.status(201).json({logdata: logdata});
    } catch(e){
        console.log(e);
        console.log('error logging habit');
        res.status(400).json({e});
    }
}

export const logHabit = async(req:Request, res:Response)=>{
    const {habitid, completed, notes} = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        const logdata = await prisma.habitLog.update({
            where: {
                habitId_dateCreated: {
                    habitId: habitid,
                    dateCreated: today,
                }
            },
            data: {
                completed: completed,
                notes: notes,
            }, 
        });
        res.status(201).json({logdata: logdata});
    } catch(e){
        console.log(e);
        console.log('error logging habit');
        res.status(400).json({e});
    }
}