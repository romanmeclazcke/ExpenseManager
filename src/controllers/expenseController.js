import expense from "../models/expenseModel.js";
import user from "../models/userModel.js";

class expenseController {
  async getExpensesByUser(req, res) {
    try {
      const { idUser } = req.params;

      const user = await user.findByPk(id);

      if (user) {
        const expenses = await expense.findAll({ where: { idUser: idUser } });

        expenses
          ? res.send(200).json({ message: expenses, details: true })
          : res.send(400).json({
              message: "No se encontraron gastos para este usuario",
              details: false,
            });
      } else {
        res.send(400).json({ message: "el usuario no existe", details: false });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createExpense(req, res) {
    try {
      const { idUser, price, date, description } = req.body;

      const data = {
        idUser,
        price,
        date,
        description,
      };

      const created = await expense.create({ data });

      created
        ? res.send(200).json({ message: "expense created", details: true })
        : res
            .send(400)
            .json({ message: "internal server error", details: false });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteExpense(req, res) {
    try {
      const id = req.params;
      const { idUser } = req.body;

      const existAndCanDelete = await expense.find({
        where: { id: id, idUser: idUser },
      });

      if (existAndCanDelete) {
        const candelete = await expense.destroy({
          where: { id: id },
        });

        candelete
          ? res.send(200).json({ message: "expense deleted", details: true })
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
      const { idUser, price, date, description } = req.body;

      const expenseToEdit = await expense.find({
        where: {
          id: id,
          idUser: idUser,
        },
      });

      if (expenseToEdit) {
        expenseToEdit.price = price;
        expenseToEdit.date = date;
        expenseToEdit.description = description;

        const actualizated =await expenseToEdit.save()

        actualizated
        ? res.send(200).json({message:"expense edit successfully", detials:true})
        : res.send(400).json({message:"internal server error", detials:false})
      } else {
        res.send(401).json({ message: "Unauthorized", details: false });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default expenseController;
