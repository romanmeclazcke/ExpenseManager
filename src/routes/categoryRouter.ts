import { Router } from "express";
import { verifySession } from "../middlewares/authJWT";
import { Request,Response } from "express";
import categoryController from "../controllers/caretoryController";



const routerCategory= Router()
const categorycontroller = new categoryController()

const path = "/category"; 

routerCategory.get(
    `${path}/all/:idUser`,verifySession,(req:Request,res:Response)=>{
       categorycontroller.getCategoryByUser(req,res)
    }
);


routerCategory.post(
    `${path}/new`,verifySession,(req:Request,res:Response)=>{
        categorycontroller.createCategory(req,res)
    }
);


routerCategory.delete(
    `${path}/delete/:idCategory`,verifySession,(req:Request,res:Response)=>{
        categorycontroller.deleteCategory(req,res)
    }
);

routerCategory.patch(
    `${path}/edit/:idCategory`,verifySession,(req:Request,res:Response)=>{
        categorycontroller.editCategory(req,res)
    }
);

export default routerCategory