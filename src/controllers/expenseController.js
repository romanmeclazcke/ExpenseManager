import Category from "../models/categoryModel.js";
import Expense from "../models/expenseModel.js";
import User from "../models/userModel.js";

class expenseController {
  async getExpensesByUser(req, res) {
    try {
      const { idUser } = req.params;

      const user = await User.findAll({ where: { id: idUser } });

      if (!user) {
        return res.status(400).json({ message: "El usuario no existe" });
      }

      const validFields = ["id", "price", "date", "categoryId"];
      const { sort, order } = req.query;

      let orderOption = [];
      //verifico si el campo a filtrar es valido
      if (sort && order && validFields.includes(sort)) {
        orderOption.push([sort, order.toUpperCase()]);
      }

      const expenses = await Expense.findAll({
        where: { idUser: idUser },
        order: orderOption, // Aplica la opción de orden si se proporciona, en sequelize si le pasas un orden vacio lo ignora
      });

      console.log(expenses);

      expenses
        ? res.status(200).json({ message: expenses, details: true })
        : res
            .status(400)
            .json({ messaga: "internal server error", details: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getExpenseByCategory(req, res) {
    try {
      const { idCategory } = req.params;
      const { idUser } = req.body;

      const existCategory = await Category.findAll({
        where: { id: idCategory, idUser: idUser },
      });

      if (!existCategory) {
        return res
          .status(404)
          .json({ message: "category not found", details: false });
      }

      const expenseByCategory = await Expense.findAll({
        where: {
          idUser: idUser,
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
      console.log(error);
    }
  }

  async getExpensesById(req, res) {
    try {
      const { id } = req.params;

      const expense = await Expense.findAll({ where: { id: id } });

      expense
        ? res.status(200).json({ message: expense, details: true })
        : res
            .status(404)
            .json({ message: "expenses not found", detials: false });
    } catch (error) {
      console.log(error);
    }
  }

  async createExpense(req, res) {
    try {
      const { idUser, price, date, description, category } = req.body;

      const data = {
        idUser,
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
      console.log(error);
    }
  }

  async deleteExpense(req, res) {
    try {
      const { id } = req.params;
      const { idUser } = req.body;

      const existAndCanDelete = await Expense.findOne({
        where: { id: id, idUser: idUser },
      });

      if (existAndCanDelete) {
        const candelete = await Expense.destroy({
          where: { id: id },
        });

        candelete
          ? res.status(200).json({ message: "expense deleted", details: true })
          : res
              .status(400)
              .json({ message: "internal server error", details: false });
      } else {
        res.status(401).json({ message: "Unauthorized", details: false });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async editExpense(req, res) {
    try {
      const { id } = req.params;
      const { idUser, price, date, description, category } = req.body;

      // Verificar si el gasto existe
      const expenseToEdit = await Expense.findOne({
        where: {
          id: id,
          idUser: idUser,
        },
      });

      if (!expenseToEdit) {
        return res
          .status(404)
          .json({ message: "Invalid expense", details: false });
      }

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
            idUser: idUser,
          },
        }
      );

      if (updated) {
        // Si se actualizó una fila (éxito)
        res
          .status(200)
          .json({ message: "expense actualizated", details: true });
      } else {
        // Si no se actualizó ninguna fila
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
