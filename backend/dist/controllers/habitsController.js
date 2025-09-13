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
exports.getAllHabits = exports.getHabitById = exports.deleteHabit = exports.updateHabit = exports.createHabit = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, tags, frequency, streak } = req.body;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const habit = yield prisma_1.default.habit.create({
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
        res.status(201).json({ habit: habit });
    }
    catch (e) {
        console.log(e);
        console.log('habit creation error');
        res.status(400).json({ e });
    }
});
exports.createHabit = createHabit;
const updateHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, tags, frequency, logs, habitid, streak } = req.body;
    try {
        const habit = yield prisma_1.default.habit.update({
            where: {
                id: habitid,
            },
            data: {
                title: title,
                tags: tags,
                frequency: frequency,
                logs: logs,
                streak: streak,
            }
        });
        res.status(201).json({ habit: habit });
    }
    catch (e) {
        console.log(e);
        console.log('habit updation error');
        res.status(400).json({ e });
    }
});
exports.updateHabit = updateHabit;
const deleteHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { habitid } = req.body;
    try {
        const habit = yield prisma_1.default.habit.delete({
            where: {
                id: habitid,
            },
        });
        res.status(201).json({ habit: habit });
    }
    catch (e) {
        console.log(e);
        console.log('habit deletion error');
        res.status(400).json({ e });
    }
});
exports.deleteHabit = deleteHabit;
const getHabitById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { habitid } = req.body;
    try {
        const habit = yield prisma_1.default.habit.findUnique({
            where: {
                authorId: userid,
                id: habitid,
            },
        });
        res.status(201).json({ habitdata: habit });
    }
    catch (e) {
        console.log(e);
        console.log('habit fetch error');
        res.status(400).json({ e });
    }
});
exports.getHabitById = getHabitById;
const getAllHabits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const habits = yield prisma_1.default.habit.findMany({
            where: {
                authorId: userid,
            },
        });
        res.status(201).json({ habitdata: habits });
    }
    catch (e) {
        console.log(e);
        console.log('habit updation error');
        res.status(400).json({ e });
    }
});
exports.getAllHabits = getAllHabits;
/*
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
    const todayDate = new Date().toISOString().split('T')[0];
    const today = new Date(todayDate + 'T00:00:00.000Z');
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
    const todayDate = new Date().toISOString().split('T')[0];
    const today = new Date(todayDate + 'T00:00:00.000Z');
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
*/ 
