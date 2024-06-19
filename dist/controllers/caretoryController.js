"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
class categoryController {
    async getCategoryByUser(req, res) {
        try {
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return;
            }
            const categories = await categoryModel_1.default.findAll({
                where: {
                    idUser: dataUser.id,
                },
            });
            if (categories.length > 0) {
                res.status(200).json({ message: categories, details: true });
            }
            else {
                res
                    .status(404)
                    .json({ message: "User has no categories", details: false });
            }
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Internal server error", details: false });
        }
    }
    async createCategory(req, res) {
        try {
            const { name } = req.body;
            const dataUser = req.session.user;
            if (!dataUser || !name) {
                return res
                    .status(404)
                    .json({ message: "complete all camps", details: false });
            }
            if (!dataUser.id) {
                return;
            }
            const data = {
                idUser: dataUser.id,
                name: name,
            };
            const created = await categoryModel_1.default.create(data);
            created
                ? res.status(200).json({ message: created, details: true })
                : res
                    .status(400)
                    .json({ message: "Interal server error", details: false });
        }
        catch (error) { }
    }
    async editCategory(req, res) {
        try {
            const { idCategory } = req.params;
            const { name } = req.body;
            const dataUser = req.session.user;
            if (!dataUser || dataUser.id) {
                return;
            }
            const category = await categoryModel_1.default.findAll({
                where: {
                    id: idCategory,
                    idUser: dataUser.id,
                },
            });
            if (category.length === 0) {
                return res
                    .status(404)
                    .json({ message: "Category not found", details: false });
            }
            const data = {
                idUser: dataUser.id,
                name: name,
            };
            const updated = await categoryModel_1.default.update(data, {
                where: {
                    id: idCategory,
                    idUser: dataUser.id,
                },
            });
            updated
                ? res.status(200).json({ message: updated, details: true })
                : res
                    .status(400)
                    .json({ message: "Internal server error", details: false });
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ message: "Internal server error", details: false });
        }
    }
    async deleteCategory(req, res) {
        try {
            const { idCategory } = req.params;
            const dataUser = req.session.user;
            if (!dataUser || dataUser.id) {
                return;
            }
            const category = await categoryModel_1.default.findAll({
                where: {
                    id: idCategory,
                    idUser: dataUser.id,
                },
            });
            if (category.length === 0) {
                return res
                    .status(404)
                    .json({ message: "Invalid category", details: false });
            }
            const deleted = await categoryModel_1.default.destroy({
                where: {
                    id: idCategory,
                    idUser: dataUser.id,
                },
            });
            deleted
                ? res.status(200).json({ message: deleted, details: true })
                :
                    res.status(400).json({ message: "cannot deleted", details: false });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Internal server error", details: false });
        }
    }
}
exports.default = categoryController;
