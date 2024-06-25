import { Router , Request,Response} from "express";
import { verifySession } from "../middlewares/authJWT";
import summaryController from "../controllers/summaryController"


const routerSummary =  Router();
const summarycontroller = new summaryController();

const path= "/summary"

routerSummary.get(
 `${path}/all`,verifySession,(req:Request,res:Response)=>{
        summarycontroller.generateSummaryExpenseAndIncome(req,res);
    }
)

export default routerSummary;