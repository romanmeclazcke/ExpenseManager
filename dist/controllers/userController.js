"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bycriptResourse_1 = require("../services/encriptServices/bycriptResourse");
class UserController {
    async createUser(req, res) {
        try {
            const { email, name, lastname, password } = req.body;
            // Verificar si todos los campos están presentes y son válidos
            if (!email || !name || !lastname || !password) {
                return res.status(400).json({
                    message: "Complete all fields",
                    details: false,
                });
            }
            // Verificar si ya existe un usuario con el mismo email
            const existingUser = await userModel_1.default.findOne({ where: { email: email } });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists", details: false });
            }
            // Encriptar la contraseña antes de guardarla en la base de datos
            const hashedPassword = await (0, bycriptResourse_1.encryptPassword)(password);
            // Crear el nuevo usuario en la base de datos
            const newUser = await userModel_1.default.create({
                email,
                name,
                lastname,
                password: hashedPassword,
            });
            // Verificar si el usuario se creó correctamente
            if (newUser) {
                return res.status(200).json({ message: "User created successfully", details: true });
            }
            else {
                return res.status(400).json({ message: "Failed to create user", details: false });
            }
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error", details: false });
        }
    }
    async editPassword(req, res) {
        try {
            const { password, newPassword, confirmNewPassword } = req.body;
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            if (!newPassword ||
                !confirmNewPassword ||
                newPassword !== confirmNewPassword) {
                return res
                    .status(400)
                    .json({
                    message: "Passwords must match and cannot be empty",
                    details: false,
                });
            }
            const user = await userModel_1.default.findOne({
                where: {
                    id: dataUser.id,
                },
            });
            if (!user) {
                return res.status(404).json({ message: "user not found", details: false });
            }
            const isValid = await (0, bycriptResourse_1.verifyPasswordSecurity)(password, user.password);
            if (!isValid) {
                return res
                    .status(400)
                    .json({ message: "password invalid", datail: false });
            }
            const passwordEncripted = await (0, bycriptResourse_1.encryptPassword)(newPassword);
            const updated = await userModel_1.default.update({ password: passwordEncripted }, {
                where: {
                    id: dataUser.id,
                },
            });
            updated ?
                res.status(200).json({ message: "edit succesfully", details: true })
                : res.status(400).json({ message: "error on update password", details: true });
        }
        catch (error) {
            res.status(500).json({ message: "internal server error", details: true });
        }
    }
}
exports.default = UserController;
