
import { Router } from "express";
import sessionController from "../controllers/sessionController";
import { Request,Response } from "express";

const routerSession= Router()
const sessioncontroller = new sessionController()

const path = "/session"; 


routerSession.post(
    `${path}/login`,(req:Request,res:Response)=>{
        sessioncontroller.createToken(req,res)
    }
);

routerSession.delete(
`${path}/logout`,(req:Request,res:Response)=> {
   sessioncontroller.logout(req, res);
})

export default routerSession