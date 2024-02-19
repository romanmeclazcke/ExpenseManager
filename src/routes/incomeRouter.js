import incomeController from "../controllers/incomeController.js";
import { Router } from "express";

const routerIncome= Router()
const incomecontroller = new incomeController()

const path = "/income"; 

routerIncome.get(
    `${path}/all/:idUser`,(req,res)=>{
        incomecontroller.getIncomesByUser(req,res)
    }
);

routerIncome.get(
    `${path}/:id`,(req,res)=>{
        incomecontroller.getIncomesById(req,res)
    }
);

routerIncome.get(
    `${path}/category/:idCategory`,(req,res)=>{
        incomecontroller.getIncomeByCategory(req,res)
    }
);


routerIncome.post(
    `${path}/new`,(req,res)=>{
        incomecontroller.createIncome(req,res)
    }
);


routerIncome.delete(
    `${path}/delete/:id`,(req,res)=>{
        incomecontroller.deleteIncome(req,res)
    }
);

routerIncome.patch(
    `${path}/edit/:id`,(req,res)=>{
        incomecontroller.editIncome(req,res)
    }
);

export default routerIncome