import {Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection";
import User from "./userModel";


class Category extends Model{
    
}

 Category.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true 
    },
    idUser: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color:{
        type: DataTypes.STRING,
        allowNull: false
    },
    emoji:{
        type: DataTypes.STRING,
        allowNull: false

    }
},{
    sequelize,
    modelName: "Category"
});

Category.belongsTo(User, {
     foreignKey: 'idUser', // Nombre del campo en Category que referencia al id en User
     targetKey: 'id', // Campo de User al que hace referencia idUser
 });
    

export default Category;
