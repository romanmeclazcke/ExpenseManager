import Category from "../models/categoryModel.js";
import Income from "../models/incomeModel.js";
import User from "../models/userModel.js";
import { validateOwnerDataIdUser } from "../services/validateOwnerData.js";

class incomeController {
  async getIncomesByUser(req, res) {
    try {
      const { idUser } = req.params;
      const dataUser = req.session.user;

      if ((await validateOwnerDataIdUser(idUser, dataUser)) == false) {
        //esta queriendo acceder a informaciond de otro usuario
        return res.status(400).json({ message: "Cannot access" });
      }


      const validFields = ["id", "price", "date", "categoryId"];
      const { sort, order } = req.query;

      let orderOption = [];
      if (sort && order && validFields.includes(sort)) {
        orderOption.push([sort, order.toUpperCase()]);
      }

      const incomes = await Income.findAll({
        where: { idUser: idUser },
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

  async getIncomeByCategory(req, res) {
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

  async getIncomesById(req, res) {
    try {
      const { id } = req.params;
      const dataUser = req.session.user;

      const income = await Income.findAll({
        where: { id: id, idUser: dataUser.id },
      });

      if (
        (await validateDataIdAndDataIdUser(income[0].idUser, dataUser.id)) ==
        false
      ) {
        return res.status(400).json({ message: "Cannot access" });
      }

      income
        ? res.status(200).json({ message: income, details: true })
        : res.status(404).json({ message: "income not found", detials: false });
    } catch (error) {
      res
            .status(400)
            .json({ message: "internal server error", detials: false });
    }
  }

  async createIncome(req, res) {
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

  async deleteIncome(req, res) {
    try {
      const { id } = req.params;
      const dataUser = req.session.user;

      const income = await Income.findOne({
        where: { id: id, idUser: dataUser.id },
      });

      if (
        (await validateDataIdAndDataIdUser(income[0].idUser, dataUser.id)) ==
        false
      ) {
        res.status(401).json({ message: "Unauthorized", details: false });
      }

      const candelete = await Income.destroy({
        where: { id: id },
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

  async editIncome(req, res) {
    try {
      const { id } = req.params;
      const { price, date, description, category } = req.body;
      const dataUser = req.session.user;

      const incomeToEdit = await Income.findOne({
        where: {
          id: id,
          idUser: dataUser.id,
        },
      });

      if (
        expenseToEdit != null ||
        (await validateDataIdAndDataIdUser(
          incomeToEdit[0].idUser,
          dataUser.id
        )) == false
      ) {
        return res.status(400).json({ message: "Cannot access" });
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
