"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConection_1 = require("../config/db/dbConection");
const userModel_1 = __importDefault(require("./userModel"));
class SavingGoals extends sequelize_1.Model {
}
SavingGoals.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    idUser: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    ultimateGoal: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    currentAmount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: dbConection_1.sequelize,
    modelName: "SavingGoals"
});
SavingGoals.belongsTo(userModel_1.default, {
    foreignKey: "idUser",
    targetKey: "id"
});
exports.default = SavingGoals;
