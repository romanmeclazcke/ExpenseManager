import Debts from "../models/debtsModel";
import { Request, Response } from "express";


class DebtsController{
    async getDebtsByUser(req: Request, res: Response) {
        try {
            const dataUser = req.session.user;
    
            if (!dataUser || !dataUser.id) {
                return res.status(401).json({ message: "User not authenticated", details: false });
            }
    
            const { sort, order } = req.query;
            const validFields = ["name", "amount", "dueDate", "description"];
            let orderOption: [string, "ASC" | "DESC"][] = [];
    
            if (sort && order && typeof sort === "string" && typeof order === "string" && validFields.includes(sort)) {
                orderOption.push([sort, order.toUpperCase() as "ASC" | "DESC"]);
            } else {
                orderOption.push(["dueDate", "DESC"]); // Orden por defecto si los parámetros no son válidos
            }
    
            const debts = await Debts.findAll({
                where: { idUser: dataUser.id },
                order: orderOption // Aquí es donde pasamos el orderOption correctamente
            });
    
            if (debts.length > 0) {
                res.status(200).json({ message: debts, details: true });
            } else {
                res.status(404).json({ message: "Debts not found", details: false });
            }
        } catch (error) {
            console.error("Error in getDebtsByUser:", error);
            res.status(500).json({ message: "Internal server error", details: false });
        }
    }


    async getDebtById(req:Request,res:Response){
        try {
            const {id}= req.params;
            const dataUser = req.session.user;

            if(!dataUser || !dataUser.id){
                return
              }
    
            const debt= await Debts.findOne({where:{
                id: id,
                idUser: dataUser.id
            }})
    
            debt?
            res.status(200).json({message:debt,details:true})
            : res.status(404).json({message:"debt not found", detial:false}) 
        } catch (error) {
            res.status(500).json({ message: "Internal server error", details: false });
        }
    }

    async createDebt(req:Request,res:Response){
        try {
            const dataUser = req.session.user;
            const {name, amount, dueDate,description} =req.body;

            if(!dataUser || !dataUser.id){
                return
            }
            
            const data ={
                idUser:dataUser.id,
                name,
                amount,
                dueDate,
                description
            }

            const created = await Debts.create(data)

            created?
            res.status(200).json({message:created, details:true})
            : res.status(400).json({message:"error creating debt",detial:false})

        } catch (error) {
            res.status(500).json({ message: "Internal server error", details: false });
        }
    }


    async updateDebt(req:Request,res:Response){
        try {
            const {id}= req.params;
            const dataUser = req.session.user;
            const {name, amount, dueDate,description} =req.body;

            if(!dataUser || !dataUser.id){
                return
            }

            const data ={
                name,
                amount,
                dueDate,
                description
            }
            
            const updated= await Debts.update(data,{where:{
                id: id,
                idUser: dataUser.id
            }})
    
            updated?
            res.status(200).json({message:updated,details:true})
            : res.status(404).json({message:"debt not found", detial:false}) 
        } catch (error) {
            res.status(500).json({ message: "Internal server error", details: false });
        }
    }


    async deleteDebt(req:Request,res:Response){
        try {
            const {id}= req.params;
            const dataUser = req.session.user;

            if(!dataUser || !dataUser.id){
                return
              }

            const deleted = await Debts.destroy({where:{
                id: id,
                idUser:dataUser.id
            }})

            deleted ?
            res.status(200).json({message:deleted, details:true})
            : res.status(400).json({message:"cannot deleted", details:false})
        } catch (error) {
            res
            .status(500)
            .json({ message: "Internal server error", details: false });
        }
    }
}


export default DebtsController;