import expenseController from "../controllers/expenseController.js";
import { Router } from "express";

const routerExpense= Router()
const expensecontroller = new expenseController()

const path = "/expense"; 

routerExpense.get(
    `${path}/:idUser`,(req,res)=>{
        expensecontroller.getExpensesByUser(req,res)
    }
)


export default routerExpense