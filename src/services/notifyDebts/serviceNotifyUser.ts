import nodemailer from 'nodemailer'

export const sendEmail = async ()=>{
    try{
        const mailData = {
              from: process.env.EMAILNOTIFY,  
              to: 'myfriend@gmail.com',  
              subject: 'Debt notification',
              text: 'That was easy!',
              html: "<b>Hello world?</b>", // html body
            };

    }catch(error){
        console.log(error);
    }
}