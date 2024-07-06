import { sequelize } from "../config/db/dbConection";
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
      }else{
        orderOption.push(["date","DESC"]);
      }

      const expenses = await Income.findAll({
        where: { idUser: dataUser.id },
        order: orderOption.length > 0 ? orderOption : undefined, // Aplicar la opción de orden si hay definida
      });

      expenses
        ? res.status(200).json({ message: expenses, details: true })
        : res
            .status(400)
            .json({ message: "Internal server error", details: false });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
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

  async getIncomeByMonths(req: Request, res: Response) {
    try {
      const dataUser = req.session.user;
  
      if (!dataUser || !dataUser.id) {
        return res.status(401).json({ message: "Unauthorized", details: false });
      }
  
      const incomesByMonth = await Income.findAll({
        where: { idUser: dataUser.id },
        attributes: [
          [sequelize.fn('DATE_TRUNC', 'month', sequelize.col('date')), 'month'],
          [sequelize.fn('SUM', sequelize.col('amount')), 'total'],
        ],
        group: ['month'],
        order:['month']
      });
  
      if (incomesByMonth) {
        res.status(200).json({ data: incomesByMonth, details: true });
      } else {
        res.status(404).json({ message: "Income not found", details: false });
      }
    } catch (error) {
      res.status(400).json({ message: "Internal server error", details: false });
    }
  }

  async createIncome(req: Request, res: Response) {
    try {
      const { price, date, description, idCategory } = req.body;
      const dataUser = req.session.user;

      if(!dataUser || !dataUser.id){
        return
      }

      const data = {
        idUser: dataUser.id,
        price,
        date,
        description,
        idCategory,
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
      const { price, date, description, idCategory } = req.body;
      const dataUser = req.session.user;

      if(!dataUser || !dataUser.id){
        return
      }
      
      const updated = await Income.update(
        {
          price: price,
          date: date,
          description: description,
          idCategory: idCategory,
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
