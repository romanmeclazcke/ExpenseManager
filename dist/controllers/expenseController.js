"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const expenseModel_1 = __importDefault(require("../models/expenseModel"));
class expenseController {
    async getExpensesByUser(req, res) {
        try {
            const dataUser = req.session.user;
            const validFields = [, "price", "date", "categoryId"]; //valores validos para el filtrado
            const { sort, order } = req.query; //recibe si existe un orden
            let orderOption = [];
            //verifico si el campo a filtrar es valido
            if (sort && order && validFields.includes(sort)) {
                orderOption.push([sort, order.toUpperCase()]);
            }
            const expenses = await expenseModel_1.default.findAll({
                where: { idUser: dataUser.id },
                order: orderOption, // Aplica la opción de orden si se proporciona, en sequelize si le pasas un orden vacio lo ignora
            });
            expenses
                ? res.status(200).json({ message: expenses, details: true })
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
    async getExpenseByCategory(req, res) {
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
            const expenseByCategory = await expenseModel_1.default.findAll({
                where: {
                    idUser: dataUser.id,
                    category: idCategory,
                },
            });
            expenseByCategory
                ? res.status(200).json({ message: expenseByCategory, details: true })
                : res.status(400).json({
                    message: "Error to list the expenses by category",
                    details: false,
                });
        }
        catch (error) {
            res
                .status(400)
                .json({ message: "internal server error", detials: false });
        }
    }
    async getExpensesById(req, res) {
        try {
            const { id } = req.params;
            const dataUser = req.session.user;
            const expense = await expenseModel_1.default.findOne({
                where: { id: id, idUser: dataUser.id },
            });
            expense
                ? res.status(200).json({ message: expense, details: true })
                : res
                    .status(404)
                    .json({ message: "expenses not found", detials: false });
        }
        catch (error) {
            res
                .status(400)
                .json({ message: "internal server error", detials: false });
        }
    }
    async createExpense(req, res) {
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
            const created = await expenseModel_1.default.create(data);
            created
                ? res.status(200).json({ message: created, details: true })
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
    async deleteExpense(req, res) {
        try {
            const { id } = req.params;
            const dataUser = req.session.user;
            const expense = await expenseModel_1.default.findOne({
                where: { id: id, idUser: dataUser.id },
            });
            const candelete = await expenseModel_1.default.destroy({
                where: { id: id },
            });
            candelete
                ? res.status(200).json({ message: "expense deleted", details: true })
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
    async editExpense(req, res) {
        try {
            const { id } = req.params;
            const { price, date, description, category } = req.body;
            const dataUser = req.session.user;
            // Verificar si el gasto existe
            const expenseToEdit = await expenseModel_1.default.findOne({
                where: {
                    id: id,
                    idUser: dataUser.id,
                },
            });
            // Actualizar los datos del gasto
            const updated = await expenseModel_1.default.update({
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
            if (updated) {
                res
                    .status(200)
                    .json({ message: "expense actualizated", details: true });
            }
            else {
                res
                    .status(400)
                    .json({ message: "Failed to update expense", details: false });
            }
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ message: "Internal server error", details: false });
        }
    }
}
exports.default = expenseController;
