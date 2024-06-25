"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const incomeModel_1 = __importDefault(require("../models/incomeModel"));
const expenseModel_1 = __importDefault(require("../models/expenseModel"));
class summaryController {
    async generateSummaryExpenseAndIncome(req, res) {
        try {
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const incomes = await incomeModel_1.default.findAll({
                where: {
                    idUser: dataUser.id
                }
            });
            const expenses = await expenseModel_1.default.findAll({
                where: {
                    idUser: dataUser.id
                }
            });
            const response = {
                incomes: incomes,
                expenses: expenses
            };
            if (incomes.length > 0 || expenses.length > 0) {
                res.status(200).json({ message: response, details: true });
            }
            else {
                res.status(404).json({ message: "User hasn't incomes and expenses", details: false });
            }
        }
        catch (error) {
            console.error("Error in generateSummaryExpenseAndIncome:", error);
            res.status(500).json({ message: "Internal server error", details: false });
        }
    }
}
exports.default = summaryController;
