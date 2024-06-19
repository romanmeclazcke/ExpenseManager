import Category from "../models/categoryModel";
import Expense from "../models/expenseModel";
import { Request, Response } from "express";

class expenseController {
  async getExpensesByUser(req: Request, res: Response) {
    try {
      const dataUser = req.session.user;

      const validFields = ["price", "date", "categoryId"]; // Campos válidos para ordenar

      const { sort, order } = req.query;

      let orderOption: [string, "ASC" | "DESC"][] = []; // Definir correctamente el tipo de orderOption

      // Verificar si se proporciona un campo de orden válido y un tipo de orden válido
      if (sort &&order && typeof sort === "string" && typeof order === "string" && validFields.includes(sort)) {
        orderOption.push([sort, order.toUpperCase() as "ASC" | "DESC"]);//"afirmo que el valor sera ASC O DESC"
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
      console.error("Error retrieving expenses:", error); // Mostrar el error en la consola para depuración
      res
        .status(400)
        .json({ message: "Internal server error", details: false });
    }
  }

  async getExpenseByCategory(req: Request, res: Response) {
    try {
      const { idCategory } = req.params;
      const dataUser = req.session.user;

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
          category: idCategory,
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

  async createExpense(req: Request, res: Response) {
    try {
      const { price, date, description, category } = req.body;
      const dataUser = req.session.user;

      const data = {
        idUser: dataUser.id,
        price,
        date,
        description,
        category,
      };

      const created = await Expense.create(data);

      created
        ? res.status(200).json({ message: created, details: true })
        : res
            .status(400)
            .json({ message: "internal server error", details: false });
    } catch (error) {
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }

  async deleteExpense(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dataUser = req.session.user;

      const expense = await Expense.findOne({
        where: { id: id, idUser: dataUser.id },
      });

      const candelete = await Expense.destroy({
        where: { id: id },
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
      const { price, date, description, category } = req.body;
      const dataUser = req.session.user;

      // Verificar si el gasto existe
      const expenseToEdit = await Expense.findOne({
        where: {
          id: id,
          idUser: dataUser.id,
        },
      });

      // Actualizar los datos del gasto
      const updated = await Expense.update(
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
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }
}

export default expenseController;
