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
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // Obtengo los gastos en ingresos en paralelo para que sea mas rapido
            const [incomes, expenses] = await Promise.all([
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
            ]);
            // Calculo la sumas en paralelo, para que los procesos sean mas rapidos
            const [sumIncomes, sumExpense] = await Promise.all([
                incomeModel_1.default.sum('price', {
                    where: {
                        idUser: dataUser.id,
                    },
                }),
                expenseModel_1.default.sum('price', {
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
            res.status(500).json({ message: 'Internal server error', details: false });
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
            // Consulta para obtener los gastos agrupados por mes del año actual
            const expenses = await expenseModel_1.default.findAll({
                attributes: [
                    [dbConection_1.sequelize.fn('DATE_FORMAT', dbConection_1.sequelize.col('date'), '%Y-%m'), 'month'],
                    [dbConection_1.sequelize.fn('SUM', dbConection_1.sequelize.col('price')), 'total'],
                ],
                where: {
                    idUser: dataUser.id,
                    date: {
                        [dbConection_1.Op.between]: [`${currentYear}-01-01`, `${currentYear}-12-31`],
                    },
                },
                group: [dbConection_1.sequelize.fn('DATE_FORMAT', dbConection_1.sequelize.col('date'), '%Y-%m')],
                order: [[dbConection_1.sequelize.literal('month'), 'ASC']],
            });
            // Consulta para obtener los ingresos agrupados por mes del año actual
            const incomes = await incomeModel_1.default.findAll({
                attributes: [
                    [dbConection_1.sequelize.fn('DATE_FORMAT', dbConection_1.sequelize.col('date'), '%Y-%m'), 'month'],
                    [dbConection_1.sequelize.fn('SUM', dbConection_1.sequelize.col('price')), 'total'],
                ],
                where: {
                    idUser: dataUser.id,
                    date: {
                        [dbConection_1.Op.between]: [`${currentYear}-01-01`, `${currentYear}-12-31`],
                    },
                },
                group: [dbConection_1.sequelize.fn('DATE_FORMAT', dbConection_1.sequelize.col('date'), '%Y-%m')],
                order: [[dbConection_1.sequelize.literal('month'), 'ASC']],
            });
            const summary = [];
            for (let i = 0; i < 12; i++) {
                const month = {
                    month: (0, getNameMonth_1.getMonthName)(i),
                    expensesAmount: expenses[i] || 0, //revisar error porque agrupa mal los datos
                    incomesAmount: incomes[i] || 0,
                };
                summary.push(month);
            }
            summary.length > 0
                ? res.status(200).json({ message: summary, details: true })
                : res.status(404).json({ message: "Error", details: false });
        }
        catch (error) {
            console.error('Error fetching summary:', error);
            res.status(500).json({ message: 'Error fetching summary', details: false });
        }
    }
}
exports.default = SummaryController;
