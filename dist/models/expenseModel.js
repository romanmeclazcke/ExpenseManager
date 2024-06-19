"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConection_1 = require("../config/db/dbConection");
class Expense extends sequelize_1.Model {
}
Expense.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: dbConection_1.sequelize,
    modelName: "Expense"
});
// Expense.belongsTo(User, {
//     foreignKey: 'idUser', // Nombre del campo en Category que referencia al id en User
//     targetKey: 'id', // Campo de User al que hace referencia idUser
// });
// Expense.belongsTo(Category, {
//     foreignKey: 'category', // Nombre del campo en Category que referencia al al idCategory
//     targetKey: 'id', // Campo de Category al que hace referencia 
// });
exports.default = Expense;
