import { Request, Response } from "express"
import prisma from '../utils/prisma';

export const createTodo = async (req:Request, res: Response)=>{
    const {title, tags, priority, due, notes} = req.body;
    const userid = req.user?.id;
    try {
        const todo = await prisma.todo.create({
            data: {
                title: title,
                tags: tags,
                priority: priority,
                due: due,
                notes: notes,
                author: {
                    connect: {
                        id: userid,
                    }
                }
            },
        });
        res.status(201).json({todo: todo});
    } catch(e){
        console.log('todo creation error');
        console.log(e);
        res.status(400).json({e});
    }
}

export const updateTodo = async (req:Request, res: Response)=>{
    const {title, tags, priority, due, notes, completed, todoid} = req.body;
    try {
        const todo = await prisma.todo.update({
            where: {
                id: todoid,
            },
            data: {
                title: title,
                tags: tags,
                priority: priority,
                due: due,
                notes: notes,
                completed: completed,
            },
        });
        res.status(201).json({todoid: todo.id});
    } catch(e){
        console.log('todo updation error');
        console.log(e);
        res.status(400).json({e});
    }
}

export const getAllTodos = async (req:Request, res: Response)=>{
    const userid = req.user?.id;
    try{
        const data = await prisma.todo.findMany({
            where: {
                authorId: userid,
            }
        });
        res.status(201).json({tododata: data});
    } catch(e){
        console.log('todo retreival error');
        console.log(e);
        res.status(400).json({e});
    }
}

// implement later on frontend
export const getTodoByDateRange = async(req:Request, res: Response) =>{
    const {startDate, endDate} = req.body;
    const userid = req.user?.id;
    try{
        const data = prisma.todo.findMany({
            where: {
                AND: [
                    {
                        due: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                    {
                        authorId: userid,
                    } 
                ]
            }
        });
        res.status(201).json({tododata: data});
    } catch(e) {
        console.log(e);
        res.status(400).json({e});
    }
}


export const deleteTodo = async(req:Request, res:Response)=>{
    const {todoid} = req.body;
    const userid = req.user?.id;

    try{
        const deleted = await prisma.todo.delete({
            where: {
                id: todoid,
                authorId: userid,
            }
        })
        res.status(201).json({tododata: deleted});
    } catch(e) {
        console.log('todo deletion error');
        console.log(e);
        res.status(400).json({e});
    }
}