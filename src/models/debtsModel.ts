import {Model, Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection";
import User from "./userModel.js";


class Debts extends Model{
    public id!:number
    public idUser!:number
    public name !: string
    public amount!:number
    public dueDate!:Date
    public description ?: string
}

Debts.init({
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
    },
    amount: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    dueDate: {
        type:DataTypes.DATE,
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