import { Op, sequelize } from "../config/db/dbConection";
import Category from "../models/categoryModel";
import Expense from "../models/expenseModel";
import { Request, Response } from "express";

class expenseController {
  async getExpensesByUser(req: Request, res: Response) {
    try {
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const validFields = ["price", "date", "categoryId"]; // Campos válidos para ordenar
      const { sort, order } = req.query;
      let orderOption: [string, "ASC" | "DESC"][] = []; // Definir correctamente el tipo de orderOption

      // Verificar si se proporciona un campo de orden válido y un tipo de orden válido
      if (
        sort &&
        order &&
        typeof sort === "string" &&
        typeof order === "string" &&
        validFields.includes(sort)
      ) {
        orderOption.push([sort, order.toUpperCase() as "ASC" | "DESC"]); //"afirmo que el valor sera ASC O DESC"
      } else {
        orderOption.push(["date", "DESC"]);
      }

      const expenses = await Expense.findAll({
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

  async getExpenseByCategory(req: Request, res: Response) {
    try {
      const { idCategory } = req.params;
      const dataUser = req.session.user;
      console.log(idCategory);

      if (!dataUser || !dataUser.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const existCategory = await Category.findAll({
        where: { id: idCategory, idUser: dataUser.id },
      });

      if (!existCategory) {
        return res
          .status(404)
          .json({ message: "category not found", details: false });
      }

      const expenseByCategory = await Expense.findAll({
        where: {
          idUser: dataUser.id,
          idCategory: idCategory,
        },
      });

      expenseByCategory
        ? res.status(200).json({ message: expenseByCategory, details: true })
        : res.status(400).json({
            message: "Error to list the expenses by category",
            details: false,
          });
    } catch (error) {
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }

  async getExpensesById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const expense = await Expense.findOne({
        where: { id: id, idUser: dataUser.id },
      });

      expense
        ? res.status(200).json({ message: expense, details: true })
        : res
            .status(404)
            .json({ message: "expenses not found", detials: false });
    } catch (error) {
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }

  async  getExpenseByMonths(req: Request, res: Response) {
    try {
      const dataUser = req.session.user;
  
      // Verifica si el usuario está autenticado
      if (!dataUser || !dataUser.id) {
        return res.status(401).json({ message: "Unauthorized", details: false });
      }
      
      // Obtener el año actual
      const currentYear = new Date().getFullYear();
      
      // Consulta para obtener los gastos agrupados por mes y año del año actual
      const expenseByMonths = await Expense.findAll({
        where: {
          idUser: dataUser.id,
          // Filtrar por el año actual
          date: {
            [Op.between]: [`${currentYear}-01-01`, `${currentYear}-12-31`]
          }
        },
        attributes: [
          [sequelize.fn('YEAR', sequelize.col('date')), 'year'], // Obtener el año de la fecha
          [sequelize.fn('MONTH', sequelize.col('date')), 'month'], // Obtener el mes de la fecha
          [sequelize.fn('SUM', sequelize.col('price')), 'total'] // Sumarizar el precio
        ],
        group: ['year', 'month'], // Agrupar por año y mes
        order: [['year', 'ASC'], ['month', 'ASC']] // Ordenar por año y mes ascendente
      });
  
      
      if (expenseByMonths.length > 0) {
        res.status(200).json({ data: expenseByMonths, details: true });
      } else {
        res.status(404).json({ message: "Expenses not found", details: false });
      }
    } catch (error) {
      console.error("Error fetching expenses by month:", error);
      res.status(500).json({ message: "Internal server error", details: false });
    }
  }
  
  async createExpense(req: Request, res: Response) {
    try {
      const { price, date, description, idCategory } = req.body;
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const data = {
        idUser: dataUser.id,
        price,
        date,
        description,
        idCategory,
      };

      const created = await Expense.create(data);

      created
        ? res.status(200).json({ message: created, details: true })
        : res
            .status(400)
            .json({ message: "internal server error", details: false });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }

  async deleteExpense(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const candelete = await Expense.destroy({
        where: { id: id, idUser: dataUser.id },
      });

      candelete
        ? res.status(200).json({ message: "expense deleted", details: true })
        : res
            .status(400)
            .json({ message: "internal server error", details: false });
    } catch (error) {
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }

  async editExpense(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { price, date, description, idCategory } = req.body;
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Actualizar los datos del gasto
      const updated = await Expense.update(
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

      if (updated) {
        res
          .status(200)
          .json({ message: "expense actualizated", details: true });
      } else {
        res
          .status(400)
          .json({ message: "Failed to update expense", details: false });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }
}

export default expenseController;
