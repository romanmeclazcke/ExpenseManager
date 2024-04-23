import expenseController from "../controllers/expenseController.js";
import { Router } from "express";
import { verifySession } from "../middlewares/authJWT.js";


const routerExpense= Router()
const expensecontroller = new expenseController()

const path = "/expense"; 

routerExpense.get(
    `${path}/all/:idUser`, verifySession,(req,res)=>{
        expensecontroller.getExpensesByUser(req,res)
    }
);

routerExpense.get(
    `${path}/:id`,(req,res)=>{
        expensecontroller.getExpensesById(req,res)
    }
);

routerExpense.get(
    `${path}/category/:idCategory`,(req,res)=>{
        expensecontroller.getExpenseByCategory(req,res)
    }
);


routerExpense.post(
    `${path}/new`,(req,res)=>{
        expensecontroller.createExpense(req,res)
    }
);


routerExpense.delete(
    `${path}/delete/:id`,(req,res)=>{
        expensecontroller.deleteExpense(req,res)
    }
);

routerExpense.patch(
    `${path}/edit/:id`,(req,res)=>{
        expensecontroller.editExpense(req,res)
    }
);

export default routerExpense