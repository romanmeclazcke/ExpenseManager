import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection.js";

class User extends Model {}

User.init({
    id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize,
    modelName: "user"
});

export default User;
