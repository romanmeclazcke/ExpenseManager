import {Model, Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection";
import User from "./userModel";



class Debts extends Model{
    declare User: User;
}

Debts.init({
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

Debts.belongsTo(User, {
    foreignKey: 'idUser', // Nombre del campo en Category que referencia al id en User
    targetKey: 'id', // Campo de User al que hace referencia idUser
});



export default Debts;