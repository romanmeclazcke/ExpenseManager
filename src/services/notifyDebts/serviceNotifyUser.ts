import { transporter } from "../../config/db/servisNotifyUser";
import Debts from "../../models/debtsModel";

export const sendEmail = async (userEmail: string,userName: string,dataDebt: any) => {
  try {
    const mailData = {
      from: process.env.EMAILNOTIFY,
      to: userEmail,
      subject: "Notificación de deuda",
      text: `Hola,${userEmail}, posee una deuda proxima a vencer.`,
      html: `
            <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
              <h2 style="color: #337ab7; margin-bottom: 10px;">Notificación de deuda</h2>
              <p>Posees una deuda próxima a vencer.</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <th style="background-color: #f0f0f0; padding: 10px; border: 1px solid #ddd;">Datos de la deuda</th>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">
                    <strong>Nombre de la deuda:</strong> ${dataDebt.name}<br>
                    <strong>Descripción:</strong> ${dataDebt.description}<br>
                    <strong>Vencimiento:</strong> ${dataDebt.dueDate}<br>
                    <strong>Total de la deuda:</strong> ${dataDebt.amount}
                  </td>
                </tr>
              </table>
            </div>`,
    };

    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        console.log("Error al enviar correo:", error);
      } else {
        console.log("Email enviado con éxito:", info.response);
      }
    });
  } catch (error) {
    console.error("Error en sendEmail:", error);
  }
};
