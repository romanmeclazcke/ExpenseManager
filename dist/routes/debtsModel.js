"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authJWT_1 = require("../middlewares/authJWT");
const debtsController_1 = __importDefault(require("../controllers/debtsController"));
const routerDebts = (0, express_1.Router)();
const debtscontroller = new debtsController_1.default();
const path = "/debts";
routerDebts.get(`${path}/all/:idUser`, authJWT_1.verifySession, (req, res) => {
    debtscontroller.getDebtsByUser(req, res);
});
routerDebts.get(`${path}/:id`, authJWT_1.verifySession, (req, res) => {
    debtscontroller.getDebtById(req, res);
});
routerDebts.post(`${path}/new`, authJWT_1.verifySession, (req, res) => {
    debtscontroller.createDebt(req, res);
});
routerDebts.delete(`${path}/delete/:id`, authJWT_1.verifySession, (req, res) => {
    debtscontroller.deleteDebt(req, res);
});
routerDebts.patch(`${path}/edit/:id`, authJWT_1.verifySession, (req, res) => {
    debtscontroller.updateDebt(req, res);
});
exports.default = routerDebts;
