import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection";
import Category from "./categoryModel";
import User from "./userModel";

class Expense extends Model {}

Expense.init({
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
    modelName: "Expense"
});



 Expense.belongsTo(User, {
   foreignKey: 'idUser', // Nombre del campo en Category que referencia al id en User
     targetKey: 'id', // Campo de User al que hace referencia idUser
 });

 Expense.belongsTo(Category, {
     foreignKey: 'idCategory', // Nombre del campo en Category que referencia al al idCategory
     targetKey: 'id', // Campo de Category al que hace referencia 
 });



export default Expense;
