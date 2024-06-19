"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const incomeController_1 = __importDefault(require("../controllers/incomeController"));
const express_1 = require("express");
const authJWT_1 = require("../middlewares/authJWT");
const routerIncome = (0, express_1.Router)();
const incomecontroller = new incomeController_1.default();
const path = "/income";
routerIncome.get(`${path}/all`, authJWT_1.verifySession, (req, res) => {
    incomecontroller.getIncomesByUser(req, res);
});
routerIncome.get(`${path}/:id`, authJWT_1.verifySession, (req, res) => {
    incomecontroller.getIncomesById(req, res);
});
routerIncome.get(`${path}/summary`, authJWT_1.verifySession, (req, res) => {
    incomecontroller.getIncomeByMonths(req, res);
});
routerIncome.get(`${path}/category/:idCategory`, authJWT_1.verifySession, (req, res) => {
    incomecontroller.getIncomeByCategory(req, res);
});
routerIncome.post(`${path}/new`, authJWT_1.verifySession, (req, res) => {
    incomecontroller.createIncome(req, res);
});
routerIncome.delete(`${path}/delete/:id`, authJWT_1.verifySession, (req, res) => {
    incomecontroller.deleteIncome(req, res);
});
routerIncome.patch(`${path}/edit/:id`, authJWT_1.verifySession, (req, res) => {
    incomecontroller.editIncome(req, res);
});
exports.default = routerIncome;
