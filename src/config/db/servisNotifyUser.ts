import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 578,               // true for 465, false for other ports
    secure: false,
    auth: {
        user: 'expensemanager12345@gmail.com',
        pass: 'Portugal1091',
     }
});