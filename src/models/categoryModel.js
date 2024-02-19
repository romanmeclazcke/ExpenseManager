import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("sqlite::memory");

const Category = sequelize.define("category", {
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
    }
});
    

export default Category;
