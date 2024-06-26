import {Model, DataTypes} from "sequelize"
import { sequelize } from "../config/db/dbConection";
import User from "./userModel";


class SavingGoals extends Model {

}

SavingGoals.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true,
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endDate:{
        type :DataTypes.DATE,
        allowNull:false
    },
    currentAmount:{
        type :DataTypes.INTEGER,
        defaultValue:0
    }
},{
    sequelize,
    modelName:"SavingGoals"
})

SavingGoals.belongsTo(User,{
    foreignKey:"idUser",
    targetKey: "id"
});