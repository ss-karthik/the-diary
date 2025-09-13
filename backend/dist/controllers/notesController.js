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
exports.getNoteById = exports.getAllNotes = exports.deleteNote = exports.updateNote = exports.createNote = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, tags, timestamp, content } = req.body;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const note = yield prisma_1.default.note.create({
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
        res.status(201).json({ note: note });
    }
    catch (e) {
        console.log(e);
        console.log('note creation error');
        res.status(400).json({ e });
    }
});
exports.createNote = createNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, tags, content, noteid } = req.body;
    try {
        const note = yield prisma_1.default.note.update({
            where: {
                id: noteid,
            },
            data: {
                title: title,
                tags: tags,
                content: content,
            },
        });
        res.status(201).json({ note: note });
    }
    catch (e) {
        console.log(e);
        console.log('note updation error');
        res.status(400).json({ e });
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteid } = req.body;
    try {
        const note = yield prisma_1.default.note.delete({
            where: {
                id: noteid,
            }
        });
        res.status(201).json({ note: note });
    }
    catch (e) {
        console.log(e);
        console.log('note deletion error');
        res.status(400).json({ e });
    }
});
exports.deleteNote = deleteNote;
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const notes = yield prisma_1.default.note.findMany({
            where: {
                authorId: userid,
            }
        });
        res.status(201).json({ notedata: notes });
    }
    catch (e) {
        console.log(e);
        console.log('note deletion error');
        res.status(400).json({ e });
    }
});
exports.getAllNotes = getAllNotes;
const getNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { noteid } = req.body;
    try {
        const note = yield prisma_1.default.note.findUnique({
            where: {
                authorId: userid,
                id: noteid,
            }
        });
        res.status(201).json({ notedata: note });
    }
    catch (e) {
        console.log(e);
        console.log('note deletion error');
        res.status(400).json({ e });
    }
});
exports.getNoteById = getNoteById;
