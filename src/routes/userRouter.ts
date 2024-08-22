
import { Router } from "express";
import userController from "../controllers/userController";
import { Request,Response } from "express";
import { verifySession } from "../middlewares/authJWT";


const routerUser= Router()
const usercontroller = new userController()

const path = "/user"; 



routerUser.get(
    `${path}/show`,verifySession,(req:Request,res:Response)=>{
        usercontroller.getUserById(req,res)
    }
);

routerUser.post(
    `${path}/new`,(req:Request,res:Response)=>{
        usercontroller.createUser(req,res)
    }
);


routerUser.patch(`${path}/editpassword`,(req:Request,res:Response)=>{
    usercontroller.editPassword(req,res)
})

export default routerUser