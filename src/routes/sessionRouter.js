
import { Router } from "express";
import sessionController from "../controllers/sessionController.js";

const routerSession= Router()
const sessioncontroller = new sessionController()

const path = "/session"; 


routerSession.post(
    `${path}/login`,(req,res)=>{
        sessioncontroller.createToken(req,res)
    }
);

routerSession.delete(
`${path}/logout`, (req, res) => {
   sessioncontroller.logout(req, res);
})

export default routerSession