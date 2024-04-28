import { Sequelize } from "sequelize";
import { config } from "dotenv";
config()

export const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME,process.env.PASSWORD, {
  host:process.env.HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Base de datos y modelos sincronizados correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};


