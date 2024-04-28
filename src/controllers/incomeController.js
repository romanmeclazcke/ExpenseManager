
import Category from "../models/categoryModel.js";
import Income from "../models/incomeModel.js";
import User from "../models/userModel.js";


class incomeController {
  async  getIncomesByUser(req, res) {
    try {
      const { idUser } = req.params;
      const user = await User.findByPk(idUser);
  
      if (!user) {
        return res.status(400).json({ message: "El usuario no existe" });
      }
  
      const validFields = ["id", "price", "date", "categoryId"];
      const { sort, order } = req.query;
  
      let orderOption = [];
      if (sort && order && validFields.includes(sort)) {
        orderOption.push([sort, order.toUpperCase()]);
      }
  
      const incomes = await Income.findAll({
        where: { idUser: idUser },
        order: orderOption // Aplica la opción de orden si se proporciona, en sql si le pasas un orden vacio lo ingora
      });
  
      incomes
      ?res.status(200).json({ message: incomes, details: true }):
      res.status(400).json({messaga:"internal server error", details:false})
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getIncomesById(req, res) {
    try {
      const {id} = req.params
      
      const income= await Income.findAll({where:{id:id}})

      income
      ? res.status(200).json({message:income, details:true})
      : res.status(404).json({message:"income not found", detials:false})
      
    } catch (error) {
      console.log(error)
    }
  }

  async createIncome(req, res) {
    try {
      const { idUser, price, date, description,category } = req.body;

      const data = {
        idUser,
        price,
        date,
        description,
        category
      };

      const created = await Income.create(data);

      created
        ? res.status(200).json({ message: "income created", details: true })
        : res
            .status(400)
            .json({ message: "internal server error", details: false });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIncome(req, res) {
    try {
      const {id} = req.params;
      const { idUser } = req.body;

      const existAndCanDelete = await Income.findOne({
        where: { id: id, idUser: idUser },
      });

      if (existAndCanDelete) {
        const candelete = await Income.destroy({
          where: { id: id },
        });

        candelete
          ? res.status(200).json({ message: "income deleted", details: true })
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

  async editIncome(req, res) {
    try {
      const { id } = req.params;
      const { idUser, price, date, description,category } = req.body;

      const incomeToEdit = await Income.findOne({
        where: {
          id: id,
          idUser: idUser,
        },
      });

      if (incomeToEdit) {
        incomeToEdit.price = price;
        incomeToEdit.date = date;
        incomeToEdit.description = description;
        incomeToEdit.category=category

        const actualizated =await incomeToEdit.save()

        actualizated
        ? res.status(200).json({message:"income edit successfully", detials:true})
        : res.status(400).json({message:"internal server error", detials:false})
      } else {
        res.status(401).json({ message: "Unauthorized", details: false });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getIncomeByCategory(req,res){
    try {
      const {idCategory}= req.params
      const {idUser}= req.body
  
      const existCategory= await Category.findAll({where:{id:idCategory, idUser:idUser}})
  
      if(!existCategory){
        return res.status(404).json({message:"category not found", details:false})
      }
  
  
      const incomeByCategory= await Income.findAll({where:{
          idUser:idUser,
          catetegory:idCategory
      }})
  
      incomeByCategory
      ? res.status(200).json({message:incomeByCategory, details:true})
      : res.status(400).json({message:"Error to list the income by category" ,details:false});
    } catch (error) {
      console.log(error)
    }
  }
}

export default incomeController;
