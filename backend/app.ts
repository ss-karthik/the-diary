import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Request, Response } from "express";
import {signup, logout, login} from './controllers/authController'
import { homepage } from './controllers/homeController';
import { requireAuth } from "./middlewares/authMiddleware";
import { createTodo, deleteTodo, getAllTodos, getTodoByDateRange, updateTodo } from "./controllers/todoController";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "./controllers/notesController";
import { createHabit, deleteHabit, getAllHabits, getAllLogs, logHabit, updateHabit } from "./controllers/habitsController";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number,
        email: string,
      }; // Make it optional// Make it optional
    }
  }
}

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))

app.get('/', homepage);
app.get('/user', requireAuth, (req:Request, res:Response)=>{
    res.json(req.user);
});

app.post('/signup', signup);
app.post('/login', login);
app.post('/logout', logout);

app.post('/todos/create', requireAuth, createTodo);
app.post('/todos/getByDate', requireAuth, getTodoByDateRange);
app.post('/todos/getAll', requireAuth, getAllTodos);
app.post('/todos/update', requireAuth, updateTodo);
app.post('/todos/delete', requireAuth, deleteTodo);

app.post('/notes/create', requireAuth, createNote);
app.post('/notes/update', requireAuth, updateNote);
app.post('/notes/delete', requireAuth, deleteNote);
app.post('/notes/getAll', requireAuth, getAllNotes);
app.post('/notes/getById', requireAuth, getNoteById);

app.post('/habits/create', requireAuth, createHabit);
app.post('/habits/update', requireAuth, updateHabit);
app.post('/habits/delete', requireAuth, deleteHabit);
app.post('/habits/getAll', requireAuth, getAllHabits);
app.post('/habits/log', requireAuth, logHabit);
app.post('/habits/getLogs', requireAuth, getAllLogs); 

export default app;

