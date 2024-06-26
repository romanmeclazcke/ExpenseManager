import { Router } from "express";
import { verifySession } from "../middlewares/authJWT";
import { Request,Response } from "express";
import SavingGoalsController from "../controllers/savingsGoalsController";

const routerSavingGoals = Router();
const savingcontroller = new SavingGoalsController();

const path = "/goals";

routerSavingGoals.get(`${path}/all`, verifySession,(req:Request,res:Response) => {
  savingcontroller.getSavingGoals(req, res);
});

routerSavingGoals.get(`${path}/:id`, verifySession,(req:Request,res:Response) => {
  savingcontroller.getSavingGoalsById(req, res);
});


routerSavingGoals.post(`${path}/new`, verifySession,(req:Request,res:Response) => {
  savingcontroller.createSavingGoal(req, res);
});

routerSavingGoals.delete(`${path}/delete/:id`, verifySession,(req:Request,res:Response) => {
  savingcontroller.deleteSavingGoal(req, res);
});

routerSavingGoals.patch(`${path}/edit/:id`, verifySession,(req:Request,res:Response) => {
  savingcontroller.editSavingGoal(req, res);
});

routerSavingGoals.patch(`${path}/edit/amountcurrent/:id`, verifySession,(req:Request,res:Response) => {
  savingcontroller.editAmountCurrentSavingGoal(req, res);
});

export default routerSavingGoals;
