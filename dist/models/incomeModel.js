"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConection_1 = require("../config/db/dbConection");
const userModel_1 = __importDefault(require("./userModel"));
const expenseModel_1 = __importDefault(require("./expenseModel"));
const categoryModel_1 = __importDefault(require("./categoryModel"));
class Income extends sequelize_1.Model {
}
Income.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
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
    modelName: "income"
});
expenseModel_1.default.belongsTo(userModel_1.default, {
    foreignKey: 'idUser', // Nombre del campo en Category que referencia al id en User
    targetKey: 'id', // Campo de User al que hace referencia idUser
});
expenseModel_1.default.belongsTo(categoryModel_1.default, {
    foreignKey: 'category', // Nombre del campo en Category que referencia al al idCategory
    targetKey: 'id', // Campo de Category al que hace referencia 
});
exports.default = Income;
