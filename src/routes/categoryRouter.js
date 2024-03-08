import { Router } from "express";
import categoryController from "../controllers/caretoryController.js";

const routerCategory= Router()
const categorycontroller = new categoryController()

const path = "/category"; 

routerCategory.get(
    `${path}/all/:idUser`,(req,res)=>{
       categorycontroller.getCategoryByUser(req,res)
    }
);


routerCategory.post(
    `${path}/new`,(req,res)=>{
        categorycontroller.createCategory(req,res)
    }
);


routerCategory.delete(
    `${path}/delete/:idCategory`,(req,res)=>{
        categorycontroller.deleteCategory(req,res)
    }
);

routerCategory.patch(
    `${path}/edit/:idCategory`,(req,res)=>{
        categorycontroller.editCategory(req,res)
    }
);

export default routerCategory