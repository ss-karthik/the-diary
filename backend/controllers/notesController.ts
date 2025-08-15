import { Request, Response } from "express"
import prisma from '../utils/prisma';

export const createNote = async(req:Request, res:Response)=>{
    const {title, tags, timestamp, content} = req.body;
    const userid = req.user?.id;
    try {
        const note = await prisma.note.create({
            data: {
                title: title,
                tags: tags, 
                timestamp: timestamp,
                content: content,
                author: {
                    connect: {
                        id: userid,
                    }
                }
            },
        });
        res.status(201).json({note: note});

    } catch (e){
        console.log(e);
        console.log('note creation error');
        res.status(400).json({e});
    }
}

export const updateNote = async(req:Request, res:Response)=>{
    const {title, tags, content, noteid} = req.body;
    try {
        const note = await prisma.note.update({
            where: {
                id: noteid,
            },
            data: {
                title: title,
                tags: tags, 
                content: content,
            },
        });
        res.status(201).json({note: note});

    } catch (e){
        console.log(e);
        console.log('note updation error');
        res.status(400).json({e});
    }
}

export const deleteNote = async(req:Request, res:Response)=>{
    const {noteid} = req.body;
    try {
        const note = await prisma.note.delete({
            where: {
                id: noteid,
            }
        });
        res.status(201).json({note: note});

    } catch (e){
        console.log(e);
        console.log('note deletion error');
        res.status(400).json({e});
    }
}

export const getAllNotes = async(req:Request, res: Response)=>{
    const userid = req.user?.id;
    try {
        const notes = await prisma.note.findMany({
            where: {
                authorId: userid,
            }
        });
        res.status(201).json({notedata: notes});

    } catch (e){
        console.log(e);
        console.log('note deletion error');
        res.status(400).json({e});
    }
}

export const getNoteById = async(req: Request, res: Response)=>{
    const userid = req.user?.id;
    const {noteid} = req.body;
    try {
        const note = await prisma.note.findUnique({
            where: {
                authorId: userid,
                id: noteid,
            }
        });
        res.status(201).json({notedata: note});

    } catch (e){
        console.log(e);
        console.log('note deletion error');
        res.status(400).json({e});
    }
}