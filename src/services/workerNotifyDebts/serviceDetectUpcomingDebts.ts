import { Op } from "sequelize";
import Debts from "../../models/debtsModel";
import { sendEmail } from "./serviceNotifyUser";
import User from "../../models/userModel";

class servicesNotify{
  async getDebtsDueWithinWeek(){
    try {
      const oneWeekFromNow = new Date();
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Fecha 7 días a partir de ahora
     
      const debts = await Debts.findAll({
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
  
      debts.forEach(async (debt) => {
        const userEmail = debt.User.dataValues.email;
        const userName = debt.User.dataValues.name;
        const dataDebt = debt.dataValues;
        try {
          await sendEmail(userEmail, userName, dataDebt);
        } catch (error) {
          console.error("Error al enviar email:", error);
        }
      });
  
    } catch (error) {
      console.error('Error al obtener las deudas:', error);
      throw error;
    }
  };

}

export default servicesNotify;