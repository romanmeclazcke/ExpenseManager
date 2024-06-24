"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConection_1 = require("../config/db/dbConection");
const userModel_1 = __importDefault(require("./userModel"));
class Debts extends sequelize_1.Model {
}
Debts.init({
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
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    dueDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: dbConection_1.sequelize,
    modelName: 'Debts',
});
Debts.belongsTo(userModel_1.default, { as: 'User', foreignKey: 'idUser' });
exports.default = Debts;
