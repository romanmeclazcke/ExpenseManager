import { transporter } from '../../config/db/servisNotifyUser';
import Debts from '../../models/debtsModel';


export const sendEmail = async (userEmail:string,userName:string,dataDebt:Debts)=>{
    try{
        const mailData = {
              from: 'expensemanager12345@gmail.com',  
              to: userEmail,  
              subject: 'Debt notification',
              text: 'notificacion deuda',
              html: `posees una deuda asosciada a tu cuenta
                ${dataDebt}`, // html body
            };

        transporter.sendMail(mailData,(error,info)=>{
            if(error){
                console.log('error :' +error)
            }else{
                console.log("email enviado con exito")
            }
        })

    }catch(error){
        console.log(error);
    }
}