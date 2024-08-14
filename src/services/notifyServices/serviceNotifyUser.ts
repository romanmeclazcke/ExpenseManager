import { transporter } from "../../config/nodemailer/nodemailerConection";
import { debtsNotifyTemplete } from "../../utils/emailsTempletes/debtsNotify";
import { getMonthName } from "../../utils/getNameMonth";

export const sendEmail = async (userEmail: string,userName: string,dataDebt: any) => {
  try {
    const dueDate = new Date(dataDebt.dueDate);
    const formattedDueDate = `${dueDate.getDate()} ${getMonthName(dueDate.getMonth())} ${dueDate.getFullYear()}`; //FORMATEO DE LA FECHA

    const mailData = {
      from: process.env.EMAILNOTIFY,
      to: userEmail,
      subject: "Notificación de deuda",
      text: `Hola ${userName}, posee una deuda proxima a vencer.`,
      html:  debtsNotifyTemplete(dataDebt,formattedDueDate),
          
    };

    transporter.sendMail(mailData, (error, info) => {
      if (!error) {
        return console.log("Email enviado con éxito:", info.response);
      } 
      throw new Error('Error al enviar email: ' + error.name);
    });
  } catch (error) {
    throw new Error('Error al enviar email: ' + error);
  }
};

