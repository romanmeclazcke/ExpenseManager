import { Request, Response } from "express";
import Income from "../models/incomeModel";
import Expense from "../models/expenseModel";

class summaryController {
    async generateSummaryExpenseAndIncome(req: Request, res: Response) {
        try {
            const dataUser = req.session.user;

            if (!dataUser || !dataUser.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const incomes = await Income.findAll({
                where: {
                    idUser: dataUser.id
                }
            });

            const expenses = await Expense.findAll({
                where: {
                    idUser: dataUser.id
                }
            });

            const response = {
                incomes: incomes,
                expenses: expenses
            };

            if (incomes.length > 0 || expenses.length > 0) {
                res.status(200).json({ message: response, details: true });
            } else {
                res.status(404).json({ message: "User hasn't incomes and expenses", details: false });
            }

        } catch (error) {
            console.error("Error in generateSummaryExpenseAndIncome:", error);
            res.status(500).json({ message: "Internal server error", details: false });
        }
    }
}

export default summaryController;
