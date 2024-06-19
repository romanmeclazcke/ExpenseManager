import { Request,Response } from "express";
import expenseController from "./expenseController";
import incomeController from "./incomeController";

const ExpenseController = new expenseController();
const IncomeControlller = new incomeController();

class incomeExpenseSummaryController{
    async getSummryByMonths(req:Request, res:Response){
        const dataUser = req.session.user;

        

        


    }
}