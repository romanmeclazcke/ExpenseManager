"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const incomeModel_1 = __importDefault(require("../models/incomeModel"));
const expenseModel_1 = __importDefault(require("../models/expenseModel"));
const getNameMonth_1 = require("../utils/getNameMonth");
const sequelize_1 = __importDefault(require("sequelize/types/sequelize"));
class summaryController {
    async generateSummaryExpenseAndIncome(req, res) {
        try {
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const incomes = await incomeModel_1.default.findAll({
                where: {
                    idUser: dataUser.id,
                },
            });
            const expenses = await expenseModel_1.default.findAll({
                where: {
                    idUser: dataUser.id,
                },
            });
            const response = {
                incomes: incomes,
                expenses: expenses,
            };
            if (incomes.length > 0 || expenses.length > 0) {
                res.status(200).json({ message: response, details: true });
            }
            else {
                res
                    .status(404)
                    .json({
                    message: "User hasn't incomes and expenses",
                    details: false,
                });
            }
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Internal server error", details: false });
        }
    }
    async getSummaryByMonths(req, res) {
        //Obtiene el resultado final de Total de Gastos y Total de ingreso por mes
        try {
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                throw new Error("you most be logged");
            }
            const expenses = await expenseModel_1.default.findAll({
                where: { idUser: dataUser.id },
                attributes: [
                    [sequelize_1.default.fn("DATE_TRUNC", "month", sequelize_1.default.col("date")), "month"],
                    [sequelize_1.default.fn("SUM", sequelize_1.default.col("amount")), "total"],
                ],
                group: ["month"],
                order: ["month"],
            });
            const incomes = await expenseModel_1.default.findAll({
                where: { idUser: dataUser.id },
                attributes: [
                    [sequelize_1.default.fn("DATE_TRUNC", "month", sequelize_1.default.col("date")), "month"],
                    [sequelize_1.default.fn("SUM", sequelize_1.default.col("amount")), "total"],
                ],
                group: ["month"],
                order: ["month"],
            });
            const summary = [];
            for (let i = 0; i < 12; i++) {
                const month = {
                    month: (0, getNameMonth_1.getMonthName)(i),
                    expensesAmount: expenses[i] || 0,
                    incomesAmount: incomes[i] || 0,
                };
                summary.push(month);
            }
            summary.length > 0
                ? res.status(200).json({ message: summary, details: true })
                : res.status(404).json({ message: "Error", details: false });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = summaryController;
