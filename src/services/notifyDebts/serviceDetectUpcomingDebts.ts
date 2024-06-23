import { Op } from "sequelize";
import Debts from "../../models/debtsModel";
import { sendEmail } from "./serviceNotifyUser";
import User from "../../models/userModel";


export const getDebtsDueWithinWeek = async () => {
  try {
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Fecha 7 días a partir de ahora
   
    const debts= await Debts.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
            [Op.lt]: oneWeekFromNow,
          }
        },
        include: [{
          model: User,
          as: 'User',
          required: true, // esto es para hacer un inner join
          attributes: ['name', 'email'] // selecciona solo los atributos que necesitas de la tabla User
        }]
      });

      debts.forEach((debt)=>{
        const userEmaial = debt.User.dataValues.email;
        const userName = debt.User.dataValues.name;
        const dataDebt = debt.dataValues
        
      })

    // Iterar sobre los resultados y enviar correos electrónicos
   

    console.log("Correos electrónicos enviados con éxito");
  } catch (error) {
    console.error('Error al obtener las deudas:', error);
    throw error;
  }
};