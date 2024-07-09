import { Request, Response } from 'express';
import Income from '../models/incomeModel';
import Expense from '../models/expenseModel';
import { ExpenseAndIncomeByMonth } from '../interface/ExpenseAndIncomeByMonth';
import { getMonthName } from '../utils/getNameMonth';
import { sequelize, Op } from '../config/db/dbConection';
import { getPriceDolar } from '../utils/priceDolar';


class SummaryController {
  async generateSummaryExpenseAndIncome(req: Request, res: Response) {
    try {
      const dataUser = req.session.user;
  
      if (!dataUser || !dataUser.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Obtengo los gastos en ingresos en paralelo para que sea mas rapido
      const [incomes, expenses] = await Promise.all([
        Income.findAll({
          where: {
            idUser: dataUser.id,
          },
        }),
        Expense.findAll({
          where: {
            idUser: dataUser.id,
          },
        }),
      ]);
  
      // Calculo la sumas en paralelo, para que los procesos sean mas rapidos
      const [sumIncomes, sumExpense] = await Promise.all([
        Income.sum('price', {
          where: {
            idUser: dataUser.id,
          },
        }),
        Expense.sum('price', {
          where: {
            idUser: dataUser.id,
          },
        }),
      ]);
  
      const total = sumIncomes - sumExpense;
      const priceDolar = await getPriceDolar();
  
      const response = {
        totalPesos: total,
        totalDolarBlue: parseFloat((total / priceDolar).toFixed(2)),
        sumIncomesPesos: sumIncomes || 0,
        sumIncomesDolarBlue: parseFloat((sumIncomes / priceDolar).toFixed(2)) || 0,
        sumExpensePesos: sumExpense || 0,
        sumExpenseDolarBlue: parseFloat((sumExpense/priceDolar).toFixed(2))|| 0,
        incomes: incomes,
        expenses: expenses,
      };
  
      res.status(200).json({ message: response, details: true });
  
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', details: false });
    }
  }
  

  async getSummaryByMonths(req: Request, res: Response) {
    try {
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Obtener el año actual
      const currentYear = new Date().getFullYear();

      // Consulta para obtener los gastos agrupados por mes del año actual
      const expenses: any[] = await Expense.findAll({
        attributes: [
          [sequelize.fn("DATE_TRUNC", "month", sequelize.col("date")), "month"],
          [sequelize.fn('SUM', sequelize.col('price')), 'total'],
        ],
        where: {
          idUser: dataUser.id,
          date: {
            [Op.between]: [`${currentYear}-01-01`, `${currentYear}-12-31`],
          },
        },
        group: [sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m')],
        order: [["month", 'ASC']],
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
        order: [["month", 'ASC']],
      });

      const summary: ExpenseAndIncomeByMonth[] = [];
      for (let i = 0; i < 12; i++) {
        const month: ExpenseAndIncomeByMonth = {
          month: getMonthName(i),
          expensesAmount: expenses[i] || 0, 
          incomesAmount: incomes[i] || 0,
        };

        summary.push(month);
      }

      summary.length > 0
        ? res.status(200).json({ message: summary, details: true })
        : res.status(404).json({ message: "sumary not found", details: false });
      
    } catch (error) {
      res.status(500).json({ message: 'Error fetching summary', details: false });
    }
  }
}

export default SummaryController;
