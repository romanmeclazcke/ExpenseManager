import {Model, Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection";
import User from "./userModel.js";


class Category extends Model{
    public id!:number
    public idUser!:number
    public name !: string
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
    modelName: "category"
});

Category.belongsTo(User, {
    foreignKey: 'idUser', // Nombre del campo en Category que referencia al id en User
    targetKey: 'id', // Campo de User al que hace referencia idUser
});
    

export default Category;
