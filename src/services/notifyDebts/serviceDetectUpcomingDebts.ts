import { Op }  from "sequelize";
import Debts from "../../models/debtsModel";


export const getDebtsDueWithinWeek = async () => {
    try {
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Fecha 7 días a partir de ahora

        const debts = await Debts.findAll({
            where: {
                dueDate: {
                    [Op.lt]: oneWeekFromNow, // Fecha de vencimiento menor que una semana desde ahora
                    [Op.gt]: new Date() // Fecha de vencimiento mayor que la fecha actual (para asegurar que esté en el rango deseado)
                }
            }
        });

        console.log(debts);
    } catch (error) {
        console.error('Error al obtener las deudas:', error);
        throw error;
    }
};