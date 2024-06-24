import { transporter } from "../../config/db/servisNotifyUser";
import Debts from "../../models/debtsModel";

export const sendEmail = async (
  userEmail: string,
  userName: string,
  dataDebt: any
) => {
  try {
    const dueDate = new Date(dataDebt.dueDate);
    const formattedDueDate = `${dueDate.getDate()} ${getMonthName(
      dueDate.getMonth()
    )} ${dueDate.getFullYear()}`;

    const mailData = {
      from: process.env.EMAILNOTIFY,
      to: userEmail,
      subject: "Notificación de deuda",
      text: `Hola,${userEmail}, posee una deuda proxima a vencer.`,
      html: `<body style="background-color: #f9f9f9; font-family: Arial, sans-serif;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#ffffff" style="border: 1px solid #ddd;">
    <tbody>
      <tr>
        <td align="center">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" class="col-600">
            <tbody>
              <tr>
                <td align="center" style="background-color: #333; height: 50px; color: #ffffff;">
                  <a href="#" style="text-decoration: none;">
                    <p style="font-weight: bold;">Notificación de deuda</p>
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px;">
                  <p style="font-size: 16px; color: #333;">Posees una deuda próxima a vencer.</p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px; border-top: 1px solid #ddd;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <th style="background-color: #f0f0f0; padding: 10px; border: 1px solid #ddd;">Datos de la deuda</th>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border: 1px solid #ddd; color: #333;">
                        <strong>Nombre de la deuda:</strong> ${dataDebt.name}<br>
                        <strong>Descripción:</strong> ${dataDebt.description}<br>
                        <strong>Vencimiento:</strong> ${formattedDueDate}<br>
                        <strong>Total de la deuda:</strong> ${dataDebt.amount}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>`,
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

function getMonthName(month: any) {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return meses[month];
}
