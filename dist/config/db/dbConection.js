"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.sequelize = new sequelize_1.Sequelize(process.env.DATABASE ?? '', process.env.USERNAME ?? '', process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
const syncDatabase = async () => {
    try {
        await exports.sequelize.sync();
        console.log('Base de datos y modelos sincronizados correctamente.');
    }
    catch (error) {
        throw new Error("Error al sincronizar las bases de datos" + error);
    }
};
exports.syncDatabase = syncDatabase;
