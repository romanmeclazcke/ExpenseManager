import {Model, Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection.js";
import User from "./userModel.js";


class Debts extends Model{}

Debts.init({
    id: {
        type: DataTypes.UUID,
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
    },
    amount: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    dueDate: {
        type:DataTypes,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    }

},{
    sequelize,
    modelName: 'debts',
})

Debts.belongsTo(User,{
    foreignKey: 'idUser',
    targetKey:'id'
})

export default Debts;