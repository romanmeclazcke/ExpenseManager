import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: process.env.EMAILNOTIFY,
            pass: process.env.PASSWORDEMAIL,
         },
    secure: true,
});