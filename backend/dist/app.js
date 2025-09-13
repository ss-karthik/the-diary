"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const authController_1 = require("./controllers/authController");
const homeController_1 = require("./controllers/homeController");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const todoController_1 = require("./controllers/todoController");
const notesController_1 = require("./controllers/notesController");
const habitsController_1 = require("./controllers/habitsController");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use((0, cookie_parser_1.default)());
const allowedOrigins = ['http://localhost:5173', 'https://the-diary-omega.vercel.app'];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.get('/', homeController_1.homepage);
app.get('/user', authMiddleware_1.requireAuth, (req, res) => {
    res.json(req.user);
});
app.post('/signup', authController_1.signup);
app.post('/login', authController_1.login);
app.post('/logout', authController_1.logout);
app.post('/todos/create', authMiddleware_1.requireAuth, todoController_1.createTodo);
app.post('/todos/getByDate', authMiddleware_1.requireAuth, todoController_1.getTodoByDateRange);
app.post('/todos/getAll', authMiddleware_1.requireAuth, todoController_1.getAllTodos);
app.post('/todos/update', authMiddleware_1.requireAuth, todoController_1.updateTodo);
app.post('/todos/delete', authMiddleware_1.requireAuth, todoController_1.deleteTodo);
app.post('/notes/create', authMiddleware_1.requireAuth, notesController_1.createNote);
app.post('/notes/update', authMiddleware_1.requireAuth, notesController_1.updateNote);
app.post('/notes/delete', authMiddleware_1.requireAuth, notesController_1.deleteNote);
app.post('/notes/getAll', authMiddleware_1.requireAuth, notesController_1.getAllNotes);
app.post('/notes/getById', authMiddleware_1.requireAuth, notesController_1.getNoteById);
app.post('/habits/create', authMiddleware_1.requireAuth, habitsController_1.createHabit);
app.post('/habits/update', authMiddleware_1.requireAuth, habitsController_1.updateHabit);
app.post('/habits/delete', authMiddleware_1.requireAuth, habitsController_1.deleteHabit);
app.post('/habits/getAll', authMiddleware_1.requireAuth, habitsController_1.getAllHabits);
/*
app.post('/habits/log', requireAuth, logHabit);
app.post('/habits/getLogs', requireAuth, getAllLogs);
app.post('/habits/getTodaysLog', requireAuth, getTodaysLog);
*/
app.post('/habits/getById', authMiddleware_1.requireAuth, habitsController_1.getHabitById);
exports.default = app;
