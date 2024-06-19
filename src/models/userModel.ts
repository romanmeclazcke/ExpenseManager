import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection";

class User extends Model {
    public id!: number;
    public email!: string;
    public name!: string;
    public lastname!: string;
    public password!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
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
