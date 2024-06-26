"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const savingsGoalsModel_1 = __importDefault(require("../models/savingsGoalsModel"));
const calculatePercentaje_1 = require("../utils/calculatePercentaje");
class SavingGoalsController {
    async getSavingGoals(req, res) {
        try {
            const dataUser = req.session.user;
            console.log(dataUser);
            if (!dataUser || !dataUser.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const goals = await savingsGoalsModel_1.default.findAll({
                where: {
                    idUser: dataUser.id,
                },
            });
            console.log(goals);
            const goalsResult = await Promise.all(goals.map(async (goal) => {
                const result = {
                    id: goal.id,
                    idUser: goal.idUser,
                    name: goal.name,
                    endDate: goal.endDate,
                    ultimateGoal: goal.ultimateGoal,
                    currentAmount: goal.currentAmount,
                    progressPercentage: await (0, calculatePercentaje_1.calculatePercentage)(goal.ultimateGoal, goal.currentAmount),
                };
                return result;
            }));
            goalsResult
                ? res.status(200).json({ message: goalsResult, details: true })
                : res
                    .status(404)
                    .json({ message: "the user has no goals", details: false });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Internal server error", details: false });
        }
    }
    async getSavingGoalsById(req, res) {
        try {
            const { id } = req.params;
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return;
            }
            const goal = await savingsGoalsModel_1.default.findAll({
                where: { id: id, idUser: dataUser.id },
            });
            const goalsResult = await Promise.all(goal.map(async (goal) => {
                const result = {
                    id: goal.id,
                    idUser: goal.idUser,
                    name: goal.name,
                    endDate: goal.endDate,
                    ultimateGoal: goal.ultimateGoal,
                    currentAmount: goal.currentAmount,
                    progressPercentage: await (0, calculatePercentaje_1.calculatePercentage)(goal.ultimateGoal, goal.currentAmount),
                };
                return result;
            }));
            goalsResult
                ? res.status(200).json({ message: goalsResult, details: true })
                : res.status(404).json({ message: "income not found", detials: false });
        }
        catch (error) {
            res
                .status(400)
                .json({ message: "internal server error", detials: false });
        }
    }
    async createSavingGoal(req, res) {
        try {
            const { name, endDate, ultimateGoal } = req.body;
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return;
            }
            const data = {
                idUser: dataUser.id,
                name,
                endDate,
                ultimateGoal,
            };
            const created = await savingsGoalsModel_1.default.create(data);
            created
                ? res.status(200).json({ message: "goals created", details: true })
                : res
                    .status(500)
                    .json({ message: "internal server error", details: false });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "internal server error", detials: false });
        }
    }
    async deleteSavingGoal(req, res) {
        try {
            const { id } = req.params;
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return;
            }
            const canDelete = await savingsGoalsModel_1.default.destroy({
                where: { id: id, idUser: dataUser.id },
            });
            canDelete
                ? res.status(200).json({ message: "goal deleted", details: true })
                : res.status(404).json({ message: "goal not found", details: false });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "internal server error", detials: false });
        }
    }
    async editSavingGoal(req, res) {
        try {
            const { id } = req.params;
            const { name, endDate, ultimateGoal } = req.body;
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return;
            }
            const updated = await savingsGoalsModel_1.default.update({ name: name,
                endDate: endDate,
                ultimateGoal: ultimateGoal,
            }, {
                where: {
                    id: id,
                    idUser: dataUser.id,
                },
            });
            updated
                ? res
                    .status(200)
                    .json({ message: "goal edit successfully", detials: true })
                : res
                    .status(404)
                    .json({ message: "goal not fount", detials: false });
        }
        catch (error) {
            res
                .status(400)
                .json({ message: "internal server error", detials: false });
        }
    }
    async editAmountCurrentSavingGoal(req, res) {
        try {
            const { id } = req.params;
            const { amountCurrent } = req.body;
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return;
            }
            const goal = await savingsGoalsModel_1.default.findOne({
                where: {
                    id: id,
                    idUser: dataUser.id,
                },
            });
            if (!goal) {
                return res.status(404).json({ message: "goal not fount", detials: false });
            }
            if (amountCurrent > 0) {
                goal.currentAmount += amountCurrent;
            }
            else {
                goal.currentAmount -= amountCurrent;
            }
            const updated = await goal.save();
            updated
                ? res
                    .status(200)
                    .json({ message: updated, detials: true })
                : res
                    .status(404)
                    .json({ message: "goal not fount", detials: false });
        }
        catch (error) {
            res
                .status(400)
                .json({ message: "internal server error", detials: false });
        }
    }
}
exports.default = SavingGoalsController;
