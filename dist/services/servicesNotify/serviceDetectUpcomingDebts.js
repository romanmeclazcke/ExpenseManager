"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const debtsModel_1 = __importDefault(require("../../models/debtsModel"));
const serviceNotifyUser_1 = require("./serviceNotifyUser");
const userModel_1 = __importDefault(require("../../models/userModel"));
class servicesNotify {
    async getDebtsDueWithinWeek() {
        try {
            const oneWeekFromNow = new Date();
            oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Fecha 7 días a partir de ahora
            const debts = await debtsModel_1.default.findAll({
                where: {
                    dueDate: {
                        [sequelize_1.Op.gt]: new Date(),
                        [sequelize_1.Op.lt]: oneWeekFromNow,
                    }
                },
                include: [{
                        model: userModel_1.default,
                        as: 'User',
                        required: true, // esto es para hacer un inner join
                        attributes: ['name', 'email'] // selecciona solo los atributos que necesitas de la tabla User
                    }]
            });
            console.log(debts.length);
            debts.forEach(async (debt) => {
                const userEmail = debt.User.dataValues.email;
                const userName = debt.User.dataValues.name;
                const dataDebt = debt.dataValues;
                try {
                    await (0, serviceNotifyUser_1.sendEmail)(userEmail, userName, dataDebt);
                }
                catch (error) {
                    console.error("Error al enviar email:", error);
                }
            });
        }
        catch (error) {
            console.error('Error al obtener las deudas:', error);
            throw error;
        }
    }
    ;
}
exports.default = servicesNotify;
