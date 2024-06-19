import Category from "../models/categoryModel";
import Income from "../models/incomeModel";

import { Request, Response } from "express";

class incomeController {
  async getIncomesByUser(req: Request, res: Response) {
    try {
      const dataUser = req.session.user;

      if(!dataUser || !dataUser.id){
        return
      }

      const validFields = ["price", "date", "categoryId"]; // Campos válidos para ordenar

      const { sort, order } = req.query;

      let orderOption: [string, "ASC" | "DESC"][] = []; // Definir correctamente el tipo de orderOption

      // Verificar si se proporciona un campo de orden válido y un tipo de orden válido
      if (sort &&order && typeof sort === "string" && typeof order === "string" && validFields.includes(sort)) {
        orderOption.push([sort, order.toUpperCase() as "ASC" | "DESC"]);//"afirmo que el valor sera ASC O DESC"
      }

      const incomes = await Income.findAll({
        where: { idUser: dataUser.id },
        order: orderOption, // Aplica la opción de orden si se proporciona, en sql si le pasas un orden vacio lo ingora
      });

      incomes
        ? res.status(200).json({ message: incomes, details: true })
        : res
            .status(400)
            .json({ messaga: "internal server error", details: false });
    } catch (error) {
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }

  async getIncomeByCategory(req: Request, res: Response) {
    try {
      const { idCategory } = req.params;
      const dataUser = req.session.user;

      if(!dataUser || !dataUser.id){
        return
      }

      const existCategory = await Category.findAll({
        where: { id: idCategory, idUser: dataUser.id },
      });

      if (!existCategory) {
        return res
          .status(404)
          .json({ message: "category not found", details: false });
      }

      const incomeByCategory = await Income.findAll({
        where: {
          idUser: dataUser.id,
          category: idCategory,
        },
      });

      incomeByCategory
        ? res.status(200).json({ message: incomeByCategory, details: true })
        : res.status(400).json({
            message: "Error to list the incomes by category",
            details: false,
          });
    } catch (error) {
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }

  async getIncomesById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dataUser = req.session.user;

      if(!dataUser || !dataUser.id){
        return
      }

      const income = await Income.findAll({
        where: { id: id, idUser: dataUser.id },
      });

      income
        ? res.status(200).json({ message: income, details: true })
        : res.status(404).json({ message: "income not found", detials: false });
    } catch (error) {
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }

  // async getIncomeByMonth(req:Request, res:Response){
  //   try {
  //     const dataUser = req.session.user;

  //     if(!dataUser || !dataUser.id){
  //       return
  //     }


  //     const income = await Income.findAll({
  //       where: {idUser: dataUser.id },
  //       group:date,
        
  //     });

  //     income
  //       ? res.status(200).json({ message: income, details: true })
  //       : res.status(404).json({ message: "income not found", detials: false });
  //   } catch (error) {
  //     res
  //       .status(400)
  //       .json({ message: "internal server error", detials: false });
  //   }
  // }

  async createIncome(req: Request, res: Response) {
    try {
      const { price, date, description, category } = req.body;
      const dataUser = req.session.user;

      if(!dataUser || !dataUser.id){
        return
      }

      const data = {
        idUser: dataUser.id,
        price,
        date,
        description,
        category,
      };
      const created = await Income.create(data);

      created
        ? res.status(200).json({ message: "income created", details: true })
        : res
            .status(400)
            .json({ message: "internal server error", details: false });
    } catch (error) {
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }

  async deleteIncome(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dataUser = req.session.user;

      if(!dataUser || !dataUser.id){
        return
      }
     

      const candelete = await Income.destroy({
        where: { id: id, idUser: dataUser.id },
      });

      candelete
        ? res.status(200).json({ message: "income deleted", details: true })
        : res
            .status(400)
            .json({ message: "failed to delete income", details: false });
    } catch (error) {
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }

  async editIncome(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { price, date, description, category } = req.body;
      const dataUser = req.session.user;

      if(!dataUser || !dataUser.id){
        return
      }
      
      const updated = await Income.update(
        {
          price: price,
          date: date,
          description: description,
          category: category,
        },
        {
          where: {
            id: id,
            idUser: dataUser.id,
          },
        }
      );

      updated
        ? res
            .status(200)
            .json({ message: "income edit successfully", detials: true })
        : res
            .status(400)
            .json({ message: "failed to update income", detials: false });
    } catch (error) {
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }
}

export default incomeController;
