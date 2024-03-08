import Category from "../models/categoryModel.js";

class categoryController {
  async getCategoryByUser(req, res) {
    try {
      const { idUser } = req.params;
  
      const categories = await Category.findAll({
        where: {
          idUser: idUser
        }
      });
  
      if (categories.length > 0) {
        res.status(200).json({ message: categories, details: true });
      } else {
        res.status(404).json({ message: "User has no categories", details: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", details: false });
    }
  }
  

    async createCategory(req,res){
        try {
          const {idUser,name} = req.body
          
          if(!idUser || !name){
            return res.status(404).json({message:"complete all camps", details:false});
          }

          const data={
            idUser:idUser,
            name:name
          }
          
          const created= await Category.create(data)


  
          created
          ? res.status(200).json({message:created,details:true})
          : res.status(400).json({message:"interal server error", details:false})
  
        } catch (error) {
         
        }
     }

     async editCategory(req, res) {
      try {
        const { idCategory } = req.params;
        const { idUser, name } = req.body;
    
        const category = await Category.findAll({
          where: {
            id: idCategory,
            idUser: idUser
          }
        });
    
        if (category.length === 0) {
          return res.status(404).json({ message: "Invalid category", details: false });
        }
    
        const data = {
          idUser: idUser,
          name: name
        };
    
        const updated = await Category.update(data, {
          where: {
            id: idCategory,
            idUser: idUser
          }
        });
    
        updated
          ? res.status(200).json({ message: updated, details: true })
          : res.status(400).json({ message: "Internal server error", details: false });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", details: false });
      }
    }
    

    async deleteCategory(req, res) {
      try {
        const { idCategory } = req.params;
        const { idUser } = req.body;
    
        const category = await Category.findAll({
          where: {
            id: idCategory,
            idUser: idUser
          }
        });
    
        if (category.length === 0) {
          return res.status(404).json({ message: "Invalid category", details: false });
        }
    
        const deleted = await Category.destroy({
          where: {
            id: idCategory,
            idUser: idUser
          }
        });
    
        deleted
          ? res.status(200).json({ message: deleted, details: true })
          : res.status(400).json({ message: "Internal server error", details: false });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", details: false });
      }
    }

    
  
}

export default  categoryController ;
    
