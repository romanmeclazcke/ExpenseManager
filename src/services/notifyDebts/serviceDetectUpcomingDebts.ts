import { Op }  from "sequelize";
import Debts from "../../models/debtsModel";


export const getDebtsDueWithinWeek = async () => {
    try {
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Fecha 7 días a partir de ahora

        const debts = await Debts.findAll({
            where: {
                dueDate: {
                    [Op.gt]: new Date(), // Fecha de vencimiento menor que una semana desde ahora
                    [Op.lt]: oneWeekFromNow, // Fecha de vencimiento una semana mayor a la actual
            }
        }
        });
        console.log(debts);
    } catch (error) {
        console.error('Error al obtener las deudas:', error);
        throw error;
    }
};