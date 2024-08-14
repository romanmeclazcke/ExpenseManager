import { Router, Request,Response  } from "express";
import { verifySession } from "../middlewares/authJWT";
import DebtsController from "../controllers/debtsController";


const routerDebts= Router()
const debtscontroller = new DebtsController()

const path = "/debts"; 

routerDebts.get(
    `${path}/all`,verifySession,(req:Request,res:Response)=>{
        debtscontroller.getDebtsByUser(req,res);
    }
);

routerDebts.get(
    `${path}/:id`,verifySession,(req:Request,res:Response)=>{
        debtscontroller.getDebtById(req,res);
    }
);



routerDebts.post(
    `${path}/new`,verifySession,(req:Request,res:Response)=>{
        debtscontroller.createDebt(req,res);
    }
);


routerDebts.delete(
    `${path}/delete/:id`,verifySession,(req:Request,res:Response)=>{
        debtscontroller.deleteDebt(req,res);
    }
);

routerDebts.patch(
    `${path}/edit/:id`,verifySession,(req:Request,res:Response)=>{
        debtscontroller.updateDebt(req,res);
    }
);

export default routerDebts;