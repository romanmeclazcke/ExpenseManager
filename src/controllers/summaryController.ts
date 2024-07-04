import { Request, Response } from 'express';
import Income from '../models/incomeModel';
import Expense from '../models/expenseModel';
import { ExpenseAndIncomeByMonth } from '../interface/ExpenseAndIncomeByMonth';
import { getMonthName } from '../utils/getNameMonth';
import { sequelize, Op } from '../config/db/dbConection';

class SummaryController {
  async generateSummaryExpenseAndIncome(req: Request, res: Response) {
    try {
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const incomes = await Income.findAll({
        where: {
          idUser: dataUser.id,
        },
      });

      const expenses = await Expense.findAll({
        where: {
          idUser: dataUser.id,
        },
      });

      const response = {
        incomes: incomes,
        expenses: expenses,
      };

      if (incomes.length > 0 || expenses.length > 0) {
        res.status(200).json({ message: response, details: true });
      } else {
        res.status(404).json({
          message: "User hasn't incomes and expenses",
          details: false,
        });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', details: false });
    }
  }

  async getSummaryByMonths(req: Request, res: Response) {
    try {
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        throw new Error('You must be logged in');
      }

      // Obtener el año actual
      const currentYear = new Date().getFullYear();

      // Consulta para obtener los gastos agrupados por mes del año actual
      const expenses: any[] = await Expense.findAll({
        attributes: [
          [sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m'), 'month'],
          [sequelize.fn('SUM', sequelize.col('price')), 'total'],
        ],
        where: {
          idUser: dataUser.id,
          date: {
            [Op.between]: [`${currentYear}-01-01`, `${currentYear}-12-31`],
          },
        },
        group: [sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m')],
        order: [[sequelize.literal('month'), 'ASC']],
      });

      // Consulta para obtener los ingresos agrupados por mes del año actual
      const incomes: any[] = await Income.findAll({
        attributes: [
          [sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m'), 'month'],
          [sequelize.fn('SUM', sequelize.col('price')), 'total'],
        ],
        where: {
          idUser: dataUser.id,
          date: {
            [Op.between]: [`${currentYear}-01-01`, `${currentYear}-12-31`],
          },
        },
        group: [sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m')],
        order: [[sequelize.literal('month'), 'ASC']],
      });

      const summary: ExpenseAndIncomeByMonth[] = [];
      for (let i = 0; i < 12; i++) {
        const month: ExpenseAndIncomeByMonth = {
          month: getMonthName(i),
          expensesAmount: expenses[i] || 0, //revisar error porque agrupa mal los datos
          incomesAmount: incomes[i] || 0,
        };

        summary.push(month);
      }

      summary.length > 0
        ? res.status(200).json({ message: summary, details: true })
        : res.status(404).json({ message: "Error", details: false });
      
    } catch (error) {
      console.error('Error fetching summary:', error);
      res.status(500).json({ message: 'Error fetching summary', details: false });
    }
  }
}

export default SummaryController;
