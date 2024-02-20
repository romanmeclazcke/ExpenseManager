
import { Router } from "express";
import sessionController from "../controllers/sessionController.js";

const routerSession= Router()
const sessioncontroller = new sessionController()

const path = "/session"; 


routerSession.post(
    `${path}/createtoken`,(req,res)=>{
        sessioncontroller.createToken(req,res)
    }
);

export default routerSession