import incomeController from "../controllers/incomeController.js";
import { Router } from "express";
import { verifySession } from "../middlewares/authJWT.js";


const routerIncome= Router()
const incomecontroller = new incomeController()

const path = "/income"; 

routerIncome.get(
    `${path}/all/:idUser`,verifySession,(req,res)=>{
        incomecontroller.getIncomesByUser(req,res)
    }
);

routerIncome.get(
    `${path}/:id`,verifySession,(req,res)=>{
        incomecontroller.getIncomesById(req,res)
    }
);

routerIncome.get(
    `${path}/category/:idCategory`,verifySession,(req,res)=>{
        incomecontroller.getIncomeByCategory(req,res)
    }
);


routerIncome.post(
    `${path}/new`,verifySession,(req,res)=>{
        incomecontroller.createIncome(req,res)
    }
);


routerIncome.delete(
    `${path}/delete/:id`,verifySession,(req,res)=>{
        incomecontroller.deleteIncome(req,res)
    }
);

routerIncome.patch(
    `${path}/edit/:id`,verifySession,(req,res)=>{
        incomecontroller.editIncome(req,res)
    }
);

export default routerIncome