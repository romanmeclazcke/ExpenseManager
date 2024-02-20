
import { Router } from "express";
import userController from "../controllers/userController.js";


const routerUser= Router()
const usercontroller = new userController()

const path = "/user"; 


routerUser.post(
    `${path}/new`,(req,res)=>{
        usercontroller.createUser(req,res)
    }
);

export default routerUser