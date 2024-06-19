"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expenseController_1 = __importDefault(require("../controllers/expenseController"));
const express_1 = require("express");
const authJWT_1 = require("../middlewares/authJWT");
const routerExpense = (0, express_1.Router)();
const expensecontroller = new expenseController_1.default();
const path = "/expense";
routerExpense.get(`${path}/all`, authJWT_1.verifySession, (req, res) => {
    expensecontroller.getExpensesByUser(req, res);
});
routerExpense.get(`${path}/:id`, authJWT_1.verifySession, (req, res) => {
    expensecontroller.getExpensesById(req, res);
});
routerExpense.get(`${path}/category/:idCategory`, authJWT_1.verifySession, (req, res) => {
    expensecontroller.getExpenseByCategory(req, res);
});
routerExpense.get(`${path}/summary`, authJWT_1.verifySession, (req, res) => {
    expensecontroller.getExpenseByMonths(req, res);
});
routerExpense.post(`${path}/new`, authJWT_1.verifySession, (req, res) => {
    expensecontroller.createExpense(req, res);
});
routerExpense.delete(`${path}/delete/:id`, authJWT_1.verifySession, (req, res) => {
    expensecontroller.deleteExpense(req, res);
});
routerExpense.patch(`${path}/edit/:id`, authJWT_1.verifySession, (req, res) => {
    expensecontroller.editExpense(req, res);
});
exports.default = routerExpense;
