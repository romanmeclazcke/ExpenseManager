"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConection_1 = require("../config/db/dbConection");
class Category extends sequelize_1.Model {
}
Category.init({
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
    }
}, {
    sequelize: dbConection_1.sequelize,
    modelName: "Category"
});
// Category.belongsTo(User, {
//     foreignKey: 'idUser', // Nombre del campo en Category que referencia al id en User
//     targetKey: 'id', // Campo de User al que hace referencia idUser
// });
exports.default = Category;
