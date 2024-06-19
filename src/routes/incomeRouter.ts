import incomeController from "../controllers/incomeController";
import { Router } from "express";
import { verifySession } from "../middlewares/authJWT";
import { Request,Response } from "express";


const routerIncome= Router()
const incomecontroller = new incomeController()

const path = "/income"; 

routerIncome.get(
    `${path}/all/:idUser`,verifySession,(req:Request,res:Response)=>{
        incomecontroller.getIncomesByUser(req,res)
    }
);

routerIncome.get(
    `${path}/:id`,verifySession,(req:Request,res:Response)=>{
        incomecontroller.getIncomesById(req,res)
    }
);

routerIncome.get(
    `${path}/category/:idCategory`,verifySession,(req:Request,res:Response)=>{
        incomecontroller.getIncomeByCategory(req,res)
    }
);


routerIncome.post(
    `${path}/new`,verifySession,(req:Request,res:Response)=>{
        incomecontroller.createIncome(req,res)
    }
);


routerIncome.delete(
    `${path}/delete/:id`,verifySession,(req:Request,res:Response)=>{
        incomecontroller.deleteIncome(req,res)
    }
);

routerIncome.patch(
    `${path}/edit/:id`,verifySession,(req:Request,res:Response)=>{
        incomecontroller.editIncome(req,res)
    }
);

export default routerIncome