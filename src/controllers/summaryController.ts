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
      const [incomes,expenses, sumIncomes,sumExpense] = await Promise.all([
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

      const expenses:any = await Expense.findAll({
        where:{
          idUser:dataUser.id,
          date:{
            [Op.between]: [`${currentYear}-01-01`, `${currentYear}-12-31`]
          }
        },
        attributes:[
          [sequelize.fn('YEAR', sequelize.col('date')), 'year'],
          [sequelize.fn('MONTH', sequelize.col('date')), 'month'],
          [sequelize.fn('SUM', sequelize.col('price')), 'total']
        ],
        group: ['year', 'month'],
        order:[['year', 'ASC'], ['month', 'ASC']]
      })

      const incomes:any = await Income.findAll({
        where:{
          idUser:dataUser.id,
          date:{
            [Op.between]: [`${currentYear}-01-01`, `${currentYear}-12-31`]
          }
        },
        attributes:[
          [sequelize.fn('YEAR', sequelize.col('date')), 'year'],
          [sequelize.fn('MONTH', sequelize.col('date')), 'month'],
          [sequelize.fn('SUM', sequelize.col('price')), 'total']
        ],
        group: ['year', 'month'],
        order:[['year', 'ASC'], ['month', 'ASC']]
      })
      
      
      let expenseAndIncome: ExpenseAndIncomeByMonth[]=[];
      let dolarPrice =  await getPriceDolar();
      for(let i=1;i<=12;i++){
        let expensebyMonth= getDataByMonth(expenses,i);
        let incomebyMonth= getDataByMonth(incomes,i);
        
        let expenseInformation = expensebyMonth? expensebyMonth.dataValues.total:0;
        let incomeInformation = incomebyMonth ? incomebyMonth.dataValues.total : 0;

        const month: ExpenseAndIncomeByMonth = {
              month: getMonthName(i),
              totalExpenseARG: expenseInformation,
              totalIncomeARG: incomeInformation,
              totalExpenseUSDBLUE: parseFloat(( expenseInformation/ dolarPrice).toFixed(2)),
              totalIncomeUSDBLUE: parseFloat(( incomeInformation/ dolarPrice).toFixed(2))
            };
        expenseAndIncome.push(month);
      }

      expenseAndIncome
      ? res.status(200).json({message:expenseAndIncome,details:true})
      : res.status(400).json({message:"error",details:false});

    } catch (error) {
      res.status(500).json({ message: 'Error fetching summary', details: false });
    }
  }
}

function getDataByMonth(dataPerMonth:any, indexMonth:number) {
  if(dataPerMonth.length==12){
    return dataPerMonth[indexMonth];
  }else{
    for(let expense of dataPerMonth){
      if(expense.dataValues.month>indexMonth){
        return null; //si el numero del mes por el que estoy pasando es mayor al que busco significa que no esta (retorno null);
      }
      if(expense.dataValues.month==indexMonth){ //si encuentro el mes con el indice que busco retorno los datos del mes
        return expense;
      }
    }
  }
}


export default SummaryController;

