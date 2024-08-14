import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection";
import User from "./userModel";
import Category from "./categoryModel";

class Income extends Model {}

Income.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true 
    },
    idUser: {
        type: DataTypes.UUID,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idCategory: {
        type: DataTypes.UUID,
        allowNull: false
    }
},{
    sequelize,
    modelName: "Income"
});

Income.belongsTo(User, {
    foreignKey: 'idUser', // Nombre del campo en Category que referencia al id en User
      targetKey: 'id', // Campo de User al que hace referencia idUser
  });
 
  Income.belongsTo(Category, {
      foreignKey: 'idCategory', // Nombre del campo en Category que referencia al al idCategory
      targetKey: 'id', // Campo de Category al que hace referencia 
  });
 export default Income;
