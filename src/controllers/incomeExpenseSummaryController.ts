import { Request,Response, response } from "express";
import expenseController from "./expenseController";
import incomeController from "./incomeController";
import { ExpenseAndIncomeByMonth } from "../interface/ExpenseAndIncomeByMonth";
import { getMonthName } from "../utils/getNameMonth";


const ExpenseController = new expenseController();
const IncomeController = new incomeController();

class incomeExpenseSummaryController{
    async getSummaryByMonths(req:Request, res:Response){
        try {
            const dataUser = req.session.user;
    
            if(!dataUser || !dataUser.id){
                throw new Error("you most be logged");
            }
    
            const expenses:any =  ExpenseController.getExpenseByMonths(req,res);
            const incomes:any = IncomeController.getIncomeByMonths(req,res);
    
            const summary: ExpenseAndIncomeByMonth[]=[]
            for (let i=0;i<12;i++) {
                const month : ExpenseAndIncomeByMonth ={
                    month: getMonthName(i),
                    expensesAmount: expenses[i] || 0,
                    incomesAmount: incomes[i] || 0,
                }
                
                summary.push(month)
            }
            
           summary.length>0
           ? res.status(200).json({message:summary, details:true})
           : res.status(404).json({message:"Error", details:false})
    } catch (error) {
        throw new Error("Error al querer obtener el resumen de ingresos y gastos por mes")
    } 
    }
}