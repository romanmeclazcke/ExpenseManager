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
        throw new Error('Error al encriptar la contraseña');
    }
};
exports.encryptPassword = encryptPassword;
const verifyPasswordSecurity = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcrypt_1.default.compare(plainPassword, hashedPassword);
        return match;
    }
    catch (error) {
        throw new Error('Error al verificar la contraseña.');
    }
};
exports.verifyPasswordSecurity = verifyPasswordSecurity;
