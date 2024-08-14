
import { Router } from "express";
import userController from "../controllers/userController";
import { Request,Response } from "express";


const routerUser= Router()
const usercontroller = new userController()

const path = "/user"; 


routerUser.post(
    `${path}/new`,(req:Request,res:Response)=>{
        usercontroller.createUser(req,res)
    }
);


routerUser.patch(`${path}/editpassword`,(req:Request,res:Response)=>{
    usercontroller.editPassword(req,res)
})

export default routerUser