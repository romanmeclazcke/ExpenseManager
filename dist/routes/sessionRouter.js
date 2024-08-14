"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionController_1 = __importDefault(require("../controllers/sessionController"));
const routerSession = (0, express_1.Router)();
const sessioncontroller = new sessionController_1.default();
const path = "/session";
routerSession.post(`${path}/login`, (req, res) => {
    sessioncontroller.createToken(req, res);
});
routerSession.delete(`${path}/logout`, (req, res) => {
    sessioncontroller.logout(req, res);
});
exports.default = routerSession;
