"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bycriptResourse_1 = require("../services/bycriptResourse");
class UserController {
    async createUser(req, res) {
        try {
            const { email, name, lastname, password } = req.body;
            // Verificando si todos los campos están presentes
            if (!email || !name || !lastname || !password) { // Corregido el error en la condición
                return res.status(400).json({
                    message: "Complete all camps",
                    details: false,
                });
            }
            // Verificando si ya existe un usuario con el mismo email
            const user = await userModel_1.default.findOne({ where: { email: email } }); // Cambiado findAll por findOne
            if (user) { // Corregido el nombre de la propiedad length
                return res.status(400).json({ message: "User already exist", details: true });
            }
            // Creando el nuevo usuario con la contraseña encriptada
            const hashedPassword = await (0, bycriptResourse_1.encryptPassword)(password); // Corregido el nombre de la función
            const newUser = await userModel_1.default.create({
                email,
                name,
                lastname,
                password: hashedPassword,
            });
            newUser
                ? res.status(200).json({ message: "User created", details: true })
                : res.status(400).json({ message: "internal server error", details: false });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async editPassword(req, res) {
        const { password, newPassword, confirmNewPassword } = req.body;
        const dataUser = req.session.user;
        if (newPassword != confirmNewPassword) {
            return res.status(400).json({ message: "password must be same", details: false });
        }
        const user = await userModel_1.default.findOne({ where: {
                id: dataUser.id
            } });
        if (!user) {
            return res.status(404).json({ message: "user not found", details: false });
        }
        const isValid = await (0, bycriptResourse_1.verifyPasswordSecurity)(password, user.password);
        if (!isValid) {
            return res.status(400).json({ message: "password invalid", datail: false });
        }
        user.password = await (0, bycriptResourse_1.encryptPassword)(newPassword);
        await user.save();
        res.status(200).json({ message: "edit succesfully", details: true });
    }
}
exports.default = UserController;
