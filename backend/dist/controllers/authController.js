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
exports.logout = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const tokenAge = 3 * 24 * 60 * 60; //3days
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: tokenAge,
    });
};
const hash = (pwd) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 11;
    try {
        const hashedPwd = bcrypt_1.default.hash(pwd, saltRounds);
        return hashedPwd;
    }
    catch (e) {
        throw e;
    }
});
const check = (enteredPwd, originalPwd) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield bcrypt_1.default.compare(enteredPwd, originalPwd);
    return res;
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uname, email, pwd } = req.body;
    try {
        const hashedPwd = yield hash(pwd);
        const user = yield prisma_1.default.user.create({
            data: {
                username: uname,
                email: email,
                password: hashedPwd,
            },
        });
        const token = createToken(user.id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: tokenAge * 1000, //as maxAge expects time in ms
            secure: true,
            sameSite: 'none',
            partitioned: true,
        });
        res.status(201).json({ user: user.id });
    }
    catch (e) {
        console.log("Signup error");
        console.log(e);
        res.status(400).json({ e });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, pwd } = req.body;
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email: email,
            }
        });
        if (user) {
            if (!(yield check(pwd, user.password))) {
                throw new Error("Invalid Email or Password.");
            }
            const token = createToken(user.id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: tokenAge * 1000,
                //enable later once deployed
                secure: true,
                sameSite: 'none',
                partitioned: true,
            });
            res.status(201).json({ user: user.id });
        }
        else {
            throw new Error("Invalid email or password.");
        }
    }
    catch (e) {
        console.log("Login error");
        console.log(e);
        res.status(400).json({ e });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.$disconnect();
        res.cookie('jwt', "", {
            httpOnly: true,
            maxAge: 1,
            secure: true,
            sameSite: 'none',
            partitioned: true,
        });
        res.status(200).json({ user: null });
    }
    catch (e) {
        console.log("logout error");
        console.log(e);
        res.status(400).json({ e });
    }
});
exports.logout = logout;
