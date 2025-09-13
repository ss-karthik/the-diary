"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.getTodoByDateRange = exports.getAllTodos = exports.updateTodo = exports.createTodo = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, tags, priority, due, notes } = req.body;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const todo = yield prisma_1.default.todo.create({
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
        res.status(201).json({ todo: todo });
    }
    catch (e) {
        console.log('todo creation error');
        console.log(e);
        res.status(400).json({ e });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, tags, priority, due, notes, completed, todoid } = req.body;
    try {
        const todo = yield prisma_1.default.todo.update({
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
        res.status(201).json({ todoid: todo.id });
    }
    catch (e) {
        console.log('todo updation error');
        console.log(e);
        res.status(400).json({ e });
    }
});
exports.updateTodo = updateTodo;
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const data = yield prisma_1.default.todo.findMany({
            where: {
                authorId: userid,
            }
        });
        res.status(201).json({ tododata: data });
    }
    catch (e) {
        console.log('todo retreival error');
        console.log(e);
        res.status(400).json({ e });
    }
});
exports.getAllTodos = getAllTodos;
// implement later on frontend
const getTodoByDateRange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { startDate, endDate } = req.body;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const data = prisma_1.default.todo.findMany({
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
        res.status(201).json({ tododata: data });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ e });
    }
});
exports.getTodoByDateRange = getTodoByDateRange;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { todoid } = req.body;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const deleted = yield prisma_1.default.todo.delete({
            where: {
                id: todoid,
                authorId: userid,
            }
        });
        res.status(201).json({ tododata: deleted });
    }
    catch (e) {
        console.log('todo deletion error');
        console.log(e);
        res.status(400).json({ e });
    }
});
exports.deleteTodo = deleteTodo;
