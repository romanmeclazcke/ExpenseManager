import { Op }  from "sequelize";
import Debts from "../../models/debtsModel";
import { sendEmail } from "./serviceNotifyUser";

export const getDebtsDueWithinWeek = async () => {
    try {
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Fecha 7 días a partir de ahora

        const debts = await Debts.findAll({
            where: {
                dueDate: {
                    [Op.gt]: new Date(), // Fecha de vencimiento menor que una semana desde ahora
                    [Op.lt]: oneWeekFromNow, // Fecha de vencimiento una semana mayor a la actual
                    //hacer inner join con user para acceder directamente al email del user
            }
        }});

        sendEmail() //recibira los datos de la deuda y del user [name, email, toda la info de debts] => se le pasara un arreglo de esta estructura y la log de iteracion sera en el servicio de email

        console.log(debts);
    } catch (error) {
        console.error('Error al obtener las deudas:', error);
        throw error;
    }
};