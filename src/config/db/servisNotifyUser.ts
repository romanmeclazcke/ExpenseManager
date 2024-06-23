import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 578,               // true for 465, false for other ports
    secure: false,
    auth: {
        user: process.env.EMAILNOTIFY,
        pass: process.env.PASSWORDEMAIL,
     }
});