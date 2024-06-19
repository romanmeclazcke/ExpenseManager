import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection";
import User from "./userModel";
import Expense from "./expenseModel";
import Category from "./categoryModel";

class Income extends Model {}

Income.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true 
    },
    idUser: {
        type: DataTypes.INTEGER,
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
    category: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: "Income"
});

// Expense.belongsTo(User, {
//     foreignKey: 'idUser', // Nombre del campo en Category que referencia al id en User
//     targetKey: 'id', // Campo de User al que hace referencia idUser
// });

// Expense.belongsTo(Category, {
//     foreignKey: 'category', // Nombre del campo en Category que referencia al al idCategory
//     targetKey: 'id', // Campo de Category al que hace referencia 
// });

 export default Income;