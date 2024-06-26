"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authJWT_1 = require("../middlewares/authJWT");
const savingsGoalsController_1 = __importDefault(require("../controllers/savingsGoalsController"));
const routerSavingGoals = (0, express_1.Router)();
const savingcontroller = new savingsGoalsController_1.default();
const path = "/goals";
routerSavingGoals.get(`${path}/all`, authJWT_1.verifySession, (req, res) => {
    console.log("hola");
    savingcontroller.getSavingGoals(req, res);
});
routerSavingGoals.get(`${path}/:id`, authJWT_1.verifySession, (req, res) => {
    savingcontroller.getSavingGoalsById(req, res);
});
routerSavingGoals.post(`${path}/new`, authJWT_1.verifySession, (req, res) => {
    savingcontroller.createSavingGoal(req, res);
});
routerSavingGoals.delete(`${path}/delete/:id`, authJWT_1.verifySession, (req, res) => {
    savingcontroller.deleteSavingGoal(req, res);
});
routerSavingGoals.patch(`${path}/edit/:id`, authJWT_1.verifySession, (req, res) => {
    savingcontroller.editSavingGoal(req, res);
});
routerSavingGoals.patch(`${path}/edit/amountcurrent/:id`, authJWT_1.verifySession, (req, res) => {
    savingcontroller.editAmountCurrentSavingGoal(req, res);
});
exports.default = routerSavingGoals;
