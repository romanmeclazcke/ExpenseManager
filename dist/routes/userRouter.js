"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const routerUser = (0, express_1.Router)();
const usercontroller = new userController_1.default();
const path = "/user";
routerUser.post(`${path}/new`, (req, res) => {
    usercontroller.createUser(req, res);
});
routerUser.patch(`${path}/editpassword`, (req, res) => {
    usercontroller.editPassword(req, res);
});
exports.default = routerUser;
