"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConection_1 = require("../config/db/dbConection");
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const incomeModel_1 = __importDefault(require("../models/incomeModel"));
class incomeController {
    async getIncomesByUser(req, res) {
        try {
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return;
            }
            const validFields = ["price", "date", "categoryId"]; // Campos válidos para ordenar
            const { sort, order } = req.query;
            let orderOption = []; // Definir correctamente el tipo de orderOption
            // Verificar si se proporciona un campo de orden válido y un tipo de orden válido
            if (sort && order && typeof sort === "string" && typeof order === "string" && validFields.includes(sort)) {
                orderOption.push([sort, order.toUpperCase()]); //"afirmo que el valor sera ASC O DESC"
            }
            else {
                orderOption.push(["date", "DESC"]);
            }
            const expenses = await incomeModel_1.default.findAll({
                where: { idUser: dataUser.id },
                order: orderOption.length > 0 ? orderOption : undefined, // Aplicar la opción de orden si hay definida
            });
            expenses
                ? res.status(200).json({ message: expenses, details: true })
                : res
                    .status(400)
                    .json({ message: "Internal server error", details: false });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Internal server error", details: false });
        }
    }
    async getIncomeByCategory(req, res) {
        try {
            const { idCategory } = req.params;
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return;
            }
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
            if (!dataUser || !dataUser.id) {
                return;
            }
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
    async getIncomeByMonths(req, res) {
        try {
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return res.status(401).json({ message: "Unauthorized", details: false });
            }
            const incomesByMonth = await incomeModel_1.default.findAll({
                where: { idUser: dataUser.id },
                attributes: [
                    [dbConection_1.sequelize.fn('DATE_TRUNC', 'month', dbConection_1.sequelize.col('date')), 'month'],
                    [dbConection_1.sequelize.fn('SUM', dbConection_1.sequelize.col('amount')), 'total'],
                ],
                group: ['month'],
            });
            console.log(incomesByMonth);
            if (incomesByMonth) {
                res.status(200).json({ data: incomesByMonth, details: true });
            }
            else {
                res.status(404).json({ message: "Income not found", details: false });
            }
        }
        catch (error) {
            res.status(400).json({ message: "Internal server error", details: false });
        }
    }
    async createIncome(req, res) {
        try {
            const { price, date, description, category } = req.body;
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return;
            }
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
            if (!dataUser || !dataUser.id) {
                return;
            }
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
            if (!dataUser || !dataUser.id) {
                return;
            }
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
