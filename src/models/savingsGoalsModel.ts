import {Model, DataTypes} from "sequelize"
import { sequelize } from "../config/db/dbConection";
import User from "./userModel";


class SavingGoals extends Model {
    declare id: string
    declare idUser :number
    declare name:string
    declare endDate: Date
    declare ultimateGoal: number
    declare currentAmount: number
}

SavingGoals.init({
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
    endDate:{
        type :DataTypes.DATE,
        allowNull:false
    },
    ultimateGoal:{
        type: DataTypes.INTEGER,
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

export default SavingGoals;