"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authJWT_1 = require("../middlewares/authJWT");
const summaryController_1 = __importDefault(require("../controllers/summaryController"));
const routerSummary = (0, express_1.Router)();
const summarycontroller = new summaryController_1.default();
const path = "/summary";
routerSummary.get(`${path}/all`, authJWT_1.verifySession, (req, res) => {
    summarycontroller.generateSummaryExpenseAndIncome(req, res);
});
exports.default = routerSummary;
