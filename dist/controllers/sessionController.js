"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bycriptResourse_1 = require("../services/bycriptResourse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class sessionController {
    async createToken(req, res) {
        try {
            const { email, password } = req.body;
            const existUser = await userModel_1.default.findOne({ where: {
                    email: email
                } });
            if (!existUser) {
                return res.status(401).json({ message: "user not found", details: false });
            }
            const secret = process.env.SECRETJWT;
            if (await (0, bycriptResourse_1.verifyPasswordSecurity)(password, existUser.password)) {
                const token = jsonwebtoken_1.default.sign({
                    username: existUser.username,
                    id: existUser.id,
                    exp: Date.now() + 60 * 10000,
                }, secret);
                token
                    ? res.status(200).json({ message: token, userId: existUser.id, details: true })
                    : res.status(500).json({ message: "internal server error", details: false });
            }
            else {
                res.status(400).json({ message: "password incorrect", details: false });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async logout(req, res) {
        const token = req.headers['authorization'];
        if (!token) {
            res.status(404).json({ message: "you didn't log in" });
        }
        req.headers['authorization'] = '';
        res.status(200).json({ message: "logout succesfully", details: true });
    }
}
exports.default = sessionController;
