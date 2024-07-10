"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const incomeModel_1 = __importDefault(require("../models/incomeModel"));
const expenseModel_1 = __importDefault(require("../models/expenseModel"));
const getNameMonth_1 = require("../utils/getNameMonth");
const dbConection_1 = require("../config/db/dbConection");
const priceDolar_1 = require("../utils/priceDolar");
class SummaryController {
    async generateSummaryExpenseAndIncome(req, res) {
        try {
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            // Obtengo los gastos en ingresos en paralelo para que sea mas rapido
            const [incomes, expenses, sumIncomes, sumExpense] = await Promise.all([
                incomeModel_1.default.findAll({
                    where: {
                        idUser: dataUser.id,
                    },
                }),
                expenseModel_1.default.findAll({
                    where: {
                        idUser: dataUser.id,
                    },
                }),
                incomeModel_1.default.sum("price", {
                    where: {
                        idUser: dataUser.id,
                    },
                }),
                expenseModel_1.default.sum("price", {
                    where: {
                        idUser: dataUser.id,
                    },
                }),
            ]);
            const total = sumIncomes - sumExpense;
            const priceDolar = await (0, priceDolar_1.getPriceDolar)();
            const response = {
                totalPesos: total,
                totalDolarBlue: parseFloat((total / priceDolar).toFixed(2)),
                sumIncomesPesos: sumIncomes || 0,
                sumIncomesDolarBlue: parseFloat((sumIncomes / priceDolar).toFixed(2)) || 0,
                sumExpensePesos: sumExpense || 0,
                sumExpenseDolarBlue: parseFloat((sumExpense / priceDolar).toFixed(2)) || 0,
                incomes: incomes,
                expenses: expenses,
            };
            res.status(200).json({ message: response, details: true });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Internal server error", details: false });
        }
    }
    async getSummaryByMonths(req, res) {
        try {
            const dataUser = req.session.user;
            if (!dataUser || !dataUser.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            // Obtener el año actual
            const currentYear = new Date().getFullYear();
            const [expenses, incomes] = await Promise.all([
                await expenseModel_1.default.findAll({
                    where: {
                        idUser: dataUser.id,
                        date: {
                            [dbConection_1.Op.between]: [`${currentYear}-01-01`, `${currentYear}-12-31`],
                        },
                    },
                    attributes: [
                        [dbConection_1.sequelize.fn("YEAR", dbConection_1.sequelize.col("date")), "year"],
                        [dbConection_1.sequelize.fn("MONTH", dbConection_1.sequelize.col("date")), "month"],
                        [dbConection_1.sequelize.fn("SUM", dbConection_1.sequelize.col("price")), "total"],
                    ],
                    group: ["year", "month"],
                    order: [["year", "ASC"], ["month", "ASC"],],
                }),
                incomeModel_1.default.findAll({
                    where: {
                        idUser: dataUser.id,
                        date: {
                            [dbConection_1.Op.between]: [`${currentYear}-01-01`, `${currentYear}-12-31`],
                        },
                    },
                    attributes: [
                        [dbConection_1.sequelize.fn("YEAR", dbConection_1.sequelize.col("date")), "year"],
                        [dbConection_1.sequelize.fn("MONTH", dbConection_1.sequelize.col("date")), "month"],
                        [dbConection_1.sequelize.fn("SUM", dbConection_1.sequelize.col("price")), "total"],
                    ],
                    group: ["year", "month"],
                    order: [["year", "ASC"], ["month", "ASC"],],
                }),
            ]);
            let expenseAndIncome = [];
            let dolarPrice = await (0, priceDolar_1.getPriceDolar)();
            for (let i = 1; i <= 12; i++) {
                let expensebyMonth = getDataByMonth(expenses, i);
                let incomebyMonth = getDataByMonth(incomes, i);
                let expenseInformation = expensebyMonth ? expensebyMonth.dataValues.total : 0;
                let incomeInformation = incomebyMonth ? incomebyMonth.dataValues.total : 0;
                const month = {
                    month: (0, getNameMonth_1.getMonthName)(i),
                    totalExpenseARG: expenseInformation,
                    totalIncomeARG: incomeInformation,
                    totalExpenseUSDBLUE: parseFloat((expenseInformation / dolarPrice).toFixed(2)),
                    totalIncomeUSDBLUE: parseFloat((incomeInformation / dolarPrice).toFixed(2)),
                };
                expenseAndIncome.push(month);
            }
            expenseAndIncome
                ? res.status(200).json({ message: expenseAndIncome, details: true })
                : res.status(404).json({ message: "bad request", details: false });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error fetching summary", details: false });
        }
    }
}
function getDataByMonth(dataPerMonth, indexMonth) {
    if (dataPerMonth.length == 12) {
        return dataPerMonth[indexMonth];
    }
    else {
        for (let expense of dataPerMonth) {
            if (expense.dataValues.month > indexMonth) {
                return null; //si el numero del mes por el que estoy pasando es mayor al que busco significa que no esta (retorno null);
            }
            if (expense.dataValues.month == indexMonth) {
                //si encuentro el mes con el indice que busco retorno los datos del mes
                return expense;
            }
        }
    }
}
exports.default = SummaryController;
