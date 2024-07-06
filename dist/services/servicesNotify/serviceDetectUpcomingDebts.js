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
            oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
            const debts = await debtsModel_1.default.findAll({
                where: {
                    dueDate: {
                        [sequelize_1.Op.between]: [new Date(), oneWeekFromNow]
                    }
                },
                include: [{
                        model: userModel_1.default,
                        as: 'User',
                        required: true,
                        attributes: ['name', 'email']
                    }]
            });
            console.log(debts.length); // Verificar cuántos registros se obtuvieron
            await this.iterateAndSendEmail(debts); // Esperar a que se envíen todos los correos
        }
        catch (error) {
            console.error('Error al obtener las deudas proximas a vencer:', error);
            throw new Error('Error al obtener las deudas proximas a vencer');
        }
    }
    async iterateAndSendEmail(debts) {
        try {
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
            throw new Error('Error al Intentar enviar emails');
        }
    }
}
exports.default = servicesNotify;
