import expenseController from "../controllers/expenseController";
import { Router } from "express";
import { verifySession } from "../middlewares/authJWT";
import { Request,Response } from "express";

const routerExpense = Router();
const expensecontroller = new expenseController();

const path = "/expense";

routerExpense.get(`${path}/all`, verifySession,(req:Request,res:Response) => {
  expensecontroller.getExpensesByUser(req, res);
});

routerExpense.get(`${path}/:id`, verifySession,(req:Request,res:Response) => {
  expensecontroller.getExpensesById(req, res);
});

routerExpense.get(`${path}/category/:idCategory`, verifySession,(req:Request,res:Response) => {
  expensecontroller.getExpenseByCategory(req, res);
});

routerExpense.post(`${path}/new`, verifySession,(req:Request,res:Response) => {
  expensecontroller.createExpense(req, res);
});

routerExpense.delete(`${path}/delete/:id`, verifySession,(req:Request,res:Response) => {
  expensecontroller.deleteExpense(req, res);
});

routerExpense.patch(`${path}/edit/:id`, verifySession,(req:Request,res:Response) => {
  expensecontroller.editExpense(req, res);
});

export default routerExpense;
