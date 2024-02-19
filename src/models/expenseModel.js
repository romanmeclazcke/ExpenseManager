import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("sqlite::memory");

const Expense = sequelize.define("expense", {
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
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Expense;
