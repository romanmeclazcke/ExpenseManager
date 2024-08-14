"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConection_1 = require("../config/db/dbConection");
const categoryModel_1 = __importDefault(require("./categoryModel"));
const userModel_1 = __importDefault(require("./userModel"));
class Expense extends sequelize_1.Model {
}
Expense.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    idUser: {
        type: sequelize_1.DataTypes.UUID,
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
    idCategory: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize: dbConection_1.sequelize,
    modelName: "Expense"
});
Expense.belongsTo(userModel_1.default, {
    foreignKey: 'idUser', // Nombre del campo en Category que referencia al id en User
    targetKey: 'id', // Campo de User al que hace referencia idUser
});
Expense.belongsTo(categoryModel_1.default, {
    foreignKey: 'idCategory', // Nombre del campo en Category que referencia al al idCategory
    targetKey: 'id', // Campo de Category al que hace referencia 
});
exports.default = Expense;
