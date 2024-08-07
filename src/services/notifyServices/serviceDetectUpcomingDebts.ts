import { Op } from "sequelize";
import Debts from "../../models/debtsModel";
import { sendEmail } from "./serviceNotifyUser";
import User from "../../models/userModel";

class servicesNotify{
  async getDebtsDueWithinWeek() {
    try {
      const oneWeekFromNow = new Date();
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
  
      const debts = await Debts.findAll({
        where: {
          dueDate: {
            [Op.between]:[new Date(),oneWeekFromNow]
          }
        },
        include: [{
          model: User,
          as: 'User',
          required: true, 
          attributes: ['name', 'email'] 
        }]
      });
  
      console.log(debts.length); // Verificar cuántos registros se obtuvieron
  
      await this.iterateAndSendEmail(debts); // Esperar a que se envíen todos los correos
  
    } catch (error) {
      console.error('Error al obtener las deudas proximas a vencer:', error);
      throw new Error('Error al obtener las deudas proximas a vencer');
    }
  }
  

  async iterateAndSendEmail(debts:Debts[]){
    try{
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
    }catch(error){
      throw new Error('Error al Intentar enviar emails');
    }
  }

}

export default servicesNotify;