"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConection_1 = require("../config/db/dbConection");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: dbConection_1.sequelize,
    modelName: "User"
});
exports.default = User;
