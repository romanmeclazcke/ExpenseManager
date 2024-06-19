import Category from "../models/categoryModel";
import { Request, Response } from "express";


class categoryController {
  async getCategoryByUser(req:Request, res:Response) {
    try {
      const dataUser = req.session.user;


      const categories  = await Category.findAll({
        where: {
          idUser: dataUser.id,
        },
      });

      if (categories.length > 0) {
        res.status(200).json({ message: categories, details: true });
      } else {
        res
          .status(404)
          .json({ message: "User has no categories", details: false });
      }
    } catch (error) {
      
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }

  async createCategory(req:Request, res:Response) {
    try {
      const { name } = req.body;
      const { id } = req.session.user;

      if (!id || !name) {
        return res
          .status(404)
          .json({ message: "complete all camps", details: false });
      }

      const data = {
        idUser: id,
        name: name,
      };

      const created = await Category.create(data);

      created
        ? res.status(200).json({ message: created, details: true })
        : res
            .status(400)
            .json({ message: "Interal server error", details: false });
    } catch (error) {}
  }

  async editCategory(req:Request, res:Response) {
    try {
      const { idCategory } = req.params;
      const { name } = req.body;
      const dataUser = req.session.user;


      const category = await Category.findAll({
        where: {
          id: idCategory,
          idUser: dataUser.id,
        },
      });

      if (category.length === 0) {
        return res
          .status(404)
          .json({ message: "Category not found", details: false });
      }

      const data = {
        idUser: dataUser.id,
        name: name,
      };

      const updated = await Category.update(data, {
        where: {
          id: idCategory,
          idUser: dataUser.id,
        },
      });

      updated
        ? res.status(200).json({ message: updated, details: true })
        : res
            .status(400)
            .json({ message: "Internal server error", details: false });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }

  async deleteCategory(req:Request, res:Response) {
    try {
      const { idCategory } = req.params;
      const dataUser= req.session.user;

      const category = await Category.findAll({
        where: {
          id: idCategory,
          idUser: dataUser.id,
        },
      });

  

      if (category.length === 0) {
        return res
          .status(404)
          .json({ message: "Invalid category", details: false });
      }

      const deleted = await Category.destroy({
        where: {
          id: idCategory,
          idUser: dataUser.id,
        },
      });

      deleted
        ? res.status(200).json({ message: deleted, details: true })
        : 
         res.status(400).json({message:"cannot deleted", details:false})
    } catch (error) {
     
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }
}

export default categoryController;
