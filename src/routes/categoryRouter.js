import { Router } from "express";
import categoryController from "../controllers/caretoryController.js";
import { verifySession } from "../middlewares/authJWT.js";



const routerCategory= Router()
const categorycontroller = new categoryController()

const path = "/category"; 

routerCategory.get(
    `${path}/all/:idUser`,verifySession,(req,res)=>{
       categorycontroller.getCategoryByUser(req,res)
    }
);


routerCategory.post(
    `${path}/new`,verifySession,(req,res)=>{
        categorycontroller.createCategory(req,res)
    }
);


routerCategory.delete(
    `${path}/delete/:idCategory`,verifySession,(req,res)=>{
        categorycontroller.deleteCategory(req,res)
    }
);

routerCategory.patch(
    `${path}/edit/:idCategory`,verifySession,(req,res)=>{
        categorycontroller.editCategory(req,res)
    }
);

export default routerCategory