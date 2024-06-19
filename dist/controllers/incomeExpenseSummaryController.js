"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expenseController_1 = __importDefault(require("./expenseController"));
const incomeController_1 = __importDefault(require("./incomeController"));
const ExpenseController = new expenseController_1.default();
const IncomeControlller = new incomeController_1.default();
class incomeExpenseSummaryController {
    async getSummryByMonths(req, res) {
        const dataUser = req.session.user;
    }
}
