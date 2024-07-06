import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db/dbConection";


class User extends Model {
    declare id: string;
    declare email:string;
    declare name:string;
    declare lastname :string;
    declare password :string;
}

User.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    modelName: "User"
});

export default User;
