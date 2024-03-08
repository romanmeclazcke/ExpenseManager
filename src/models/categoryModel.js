import {Model, Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection.js";

class Category extends Model{}

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
    modelname:"category"
});
    

export default Category;
