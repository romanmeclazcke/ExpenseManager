import { Router } from "express";
import { verifySession } from "../middlewares/authJWT.js";
import DebtsController from "../controllers/debtsController.js";


const routerDebts= Router()
const debtscontroller = new DebtsController()

const path = "/debts"; 

routerIncome.get(
    `${path}/all/:idUser`,verifySession,(req,res)=>{
        debtscontroller.getDebtsByUser(req,res);
    }
);

routerIncome.get(
    `${path}/:id`,verifySession,(req,res)=>{
        debtscontroller.getDebtById(req,res);
    }
);



routerIncome.post(
    `${path}/new`,verifySession,(req,res)=>{
        debtscontroller.createDebt(req,res);
    }
);


routerIncome.delete(
    `${path}/delete/:id`,verifySession,(req,res)=>{
        debtscontroller.deleteDebt(req,res);
    }
);

routerIncome.patch(
    `${path}/edit/:id`,verifySession,(req,res)=>{
        debtscontroller.updateDebt(req,res);
    }
);

export default routerDebts;