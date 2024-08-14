"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailerConection_1 = require("../../config/nodemailer/nodemailerConection");
const debtsNotify_1 = require("../../utils/emailsTempletes/debtsNotify");
const getNameMonth_1 = require("../../utils/getNameMonth");
const sendEmail = async (userEmail, userName, dataDebt) => {
    try {
        const dueDate = new Date(dataDebt.dueDate);
        const formattedDueDate = `${dueDate.getDate()} ${(0, getNameMonth_1.getMonthName)(dueDate.getMonth())} ${dueDate.getFullYear()}`; //FORMATEO DE LA FECHA
        const mailData = {
            from: process.env.EMAILNOTIFY,
            to: userEmail,
            subject: "Notificación de deuda",
            text: `Hola ${userName}, posee una deuda proxima a vencer.`,
            html: (0, debtsNotify_1.debtsNotifyTemplete)(dataDebt, formattedDueDate),
        };
        nodemailerConection_1.transporter.sendMail(mailData, (error, info) => {
            if (!error) {
                return console.log("Email enviado con éxito:", info.response);
            }
            throw new Error('Error al enviar email: ' + error.name);
        });
    }
    catch (error) {
        throw new Error('Error al enviar email: ' + error);
    }
};
exports.sendEmail = sendEmail;
