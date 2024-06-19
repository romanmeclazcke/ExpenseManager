"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debtsModel_1 = __importDefault(require("../models/debtsModel"));
class DebtsController {
    async getDebtsByUser(req, res) {
        try {
            const dataUser = req.session.user;
            const validFileds = ["name", "amount", "dueDate", "description"];
            const { sort, order } = req.query;
            const orderOption = [];
            if (sort && order && validFileds.includes(sort)) {
                orderOption.push([sort, order.toUpperCase()]);
            }
            const debts = await debtsModel_1.default.findAll({ where: {
                    idUser: dataUser.id,
                    order: orderOption //si el orderOption es null, simplemente no aplica las nignuna regla
                } });
            debts ?
                res.status(200).json({ message: debts, details: true })
                : res.status(404).json({ message: "debts not found", details: false });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error", details: false });
        }
    }
    async getDebtById(req, res) {
        try {
            const { id } = req.params;
            const dataUser = req.session.user;
            const debt = await debtsModel_1.default.findOne({ where: {
                    id: id,
                    idUser: dataUser.id
                } });
            debt ?
                res.status(200).json({ message: debt, details: true })
                : res.status(404).json({ message: "debt not found", detial: false });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error", details: false });
        }
    }
    async createDebt(req, res) {
        try {
            const dataUser = req.session.user;
            const { name, amount, dueDate, description } = req.body;
            const data = {
                idUser: dataUser.id,
                name,
                amount,
                dueDate,
                description
            };
            const created = await debtsModel_1.default.create(data);
            created ?
                res.status(200).json({ message: created, details: true })
                : res.status(400).json({ message: "error creating debt", detial: false });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error", details: false });
        }
    }
    async updateDebt(req, res) {
        try {
            const { id } = req.params;
            const dataUser = req.session.user;
            const { name, amount, dueDate, description } = req.body;
            const data = {
                name,
                amount,
                dueDate,
                description
            };
            const updated = await debtsModel_1.default.update(data, { where: {
                    id: id,
                    idUser: dataUser.id
                } });
            updated ?
                res.status(200).json({ message: updated, details: true })
                : res.status(404).json({ message: "debt not found", detial: false });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error", details: false });
        }
    }
    async deleteDebt(req, res) {
        try {
            const { id } = req.params;
            const dataUser = req.session.user;
            const deleted = await debtsModel_1.default.destroy({ where: {
                    id: id,
                    idUser: dataUser.id
                } });
            deleted ?
                res.status(200).json({ message: deleted, details: true })
                : res.status(400).json({ message: "cannot deleted", details: false });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Internal server error", details: false });
        }
    }
}
exports.default = DebtsController;
