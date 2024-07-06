"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authJWT_1 = require("../middlewares/authJWT");
const caretoryController_1 = __importDefault(require("../controllers/caretoryController"));
const routerCategory = (0, express_1.Router)();
const categorycontroller = new caretoryController_1.default();
const path = "/category";
routerCategory.get(`${path}/all`, authJWT_1.verifySession, (req, res) => {
    categorycontroller.getCategoryByUser(req, res);
});
routerCategory.post(`${path}/new`, authJWT_1.verifySession, (req, res) => {
    categorycontroller.createCategory(req, res);
});
routerCategory.delete(`${path}/delete/:idCategory`, authJWT_1.verifySession, (req, res) => {
    categorycontroller.deleteCategory(req, res);
});
routerCategory.patch(`${path}/edit/:idCategory`, authJWT_1.verifySession, (req, res) => {
    categorycontroller.editCategory(req, res);
});
exports.default = routerCategory;
