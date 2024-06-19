import {Model, Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection";
import User from "./userModel";


class Category extends Model{
    
}

 Category.init({
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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: "Category"
});

// Category.belongsTo(User, {
//     foreignKey: 'idUser', // Nombre del campo en Category que referencia al id en User
//     targetKey: 'id', // Campo de User al que hace referencia idUser
// });
    

export default Category;
