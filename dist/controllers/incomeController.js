"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const incomeModel_1 = __importDefault(require("../models/incomeModel"));
class incomeController {
    async getIncomesByUser(req, res) {
        try {
            const { idUser } = req.params;
            const dataUser = req.session.user;
            const validFields = ["id", "price", "date", "categoryId"];
            const { sort, order } = req.query;
            let orderOption = [];
            if (sort && order && validFields.includes(sort)) {
                orderOption.push([sort, order.toUpperCase()]);
            }
            const incomes = await incomeModel_1.default.findAll({
                where: { idUser: idUser },
                order: orderOption, // Aplica la opción de orden si se proporciona, en sql si le pasas un orden vacio lo ingora
            });
            incomes
                ? res.status(200).json({ message: incomes, details: true })
                : res
                    .status(400)
                    .json({ messaga: "internal server error", details: false });
        }
        catch (error) {
            res
                .status(400)
                .json({ message: "internal server error", detials: false });
        }
    }
    async getIncomeByCategory(req, res) {
        try {
            const { idCategory } = req.params;
            const dataUser = req.session.user;
            const existCategory = await categoryModel_1.default.findAll({
                where: { id: idCategory, idUser: dataUser.id },
            });
            if (!existCategory) {
                return res
                    .status(404)
                    .json({ message: "category not found", details: false });
            }
            const incomeByCategory = await incomeModel_1.default.findAll({
                where: {
                    idUser: dataUser.id,
                    category: idCategory,
                },
            });
            incomeByCategory
                ? res.status(200).json({ message: incomeByCategory, details: true })
                : res.status(400).json({
                    message: "Error to list the incomes by category",
                    details: false,
                });
        }
        catch (error) {
            res
                .status(400)
                .json({ message: "internal server error", detials: false });
        }
    }
    async getIncomesById(req, res) {
        try {
            const { id } = req.params;
            const dataUser = req.session.user;
            const income = await incomeModel_1.default.findAll({
                where: { id: id, idUser: dataUser.id },
            });
            income
                ? res.status(200).json({ message: income, details: true })
                : res.status(404).json({ message: "income not found", detials: false });
        }
        catch (error) {
            res
                .status(400)
                .json({ message: "internal server error", detials: false });
        }
    }
    async createIncome(req, res) {
        try {
            const { price, date, description, category } = req.body;
            const dataUser = req.session.user;
            const data = {
                idUser: dataUser.id,
                price,
                date,
                description,
                category,
            };
            const created = await incomeModel_1.default.create(data);
            created
                ? res.status(200).json({ message: "income created", details: true })
                : res
                    .status(400)
                    .json({ message: "internal server error", details: false });
        }
        catch (error) {
            res
                .status(400)
                .json({ message: "internal server error", detials: false });
        }
    }
    async deleteIncome(req, res) {
        try {
            const { id } = req.params;
            const dataUser = req.session.user;
            const candelete = await incomeModel_1.default.destroy({
                where: { id: id, idUser: dataUser.id },
            });
            candelete
                ? res.status(200).json({ message: "income deleted", details: true })
                : res
                    .status(400)
                    .json({ message: "failed to delete income", details: false });
        }
        catch (error) {
            res
                .status(400)
                .json({ message: "internal server error", detials: false });
        }
    }
    async editIncome(req, res) {
        try {
            const { id } = req.params;
            const { price, date, description, category } = req.body;
            const dataUser = req.session.user;
            const incomeToEdit = await incomeModel_1.default.findOne({
                where: {
                    id: id,
                    idUser: dataUser.id,
                },
            });
            const updated = await incomeModel_1.default.update({
                price: price,
                date: date,
                description: description,
                category: category,
            }, {
                where: {
                    id: id,
                    idUser: dataUser.id,
                },
            });
            updated
                ? res
                    .status(200)
                    .json({ message: "income edit successfully", detials: true })
                : res
                    .status(400)
                    .json({ message: "failed to update income", detials: false });
        }
        catch (error) {
            res
                .status(400)
                .json({ message: "internal server error", detials: false });
        }
    }
}
exports.default = incomeController;
