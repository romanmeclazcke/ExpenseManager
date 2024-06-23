import {Model, Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection";
import User from "./userModel";


class Debts extends Model{
    declare User: User;
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
    modelName: 'Debts',
})

Debts.belongsTo(User, { as: 'User', foreignKey: 'idUser' });

export default Debts;