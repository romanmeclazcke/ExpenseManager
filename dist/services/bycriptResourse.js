"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPasswordSecurity = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encryptPassword = async (password) => {
    try {
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        return hashPassword;
    }
    catch (err) {
        console.log(err);
    }
};
exports.encryptPassword = encryptPassword;
const verifyPasswordSecurity = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcrypt_1.default.compare(plainPassword, hashedPassword);
        return match;
    }
    catch (error) {
        console.error("Error al comparar contraseñas:", error);
        throw error;
    }
};
exports.verifyPasswordSecurity = verifyPasswordSecurity;
