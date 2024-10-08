import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import session from "express-session";
import {Worker} from "worker_threads"

// Importar los router
import routerExpense from "../routes/expenseRouter";
import routerIncome from "../routes/incomeRouter";
import routerUser from "../routes/userRouter";
import routerSession from "../routes/sessionRouter";
import routerCategory from "../routes/categoryRouter";
import routerDebts from "../routes/debtsRouter";
import routerSummary from "../routes/summaryRouter";
import routerSavingGoals from "../routes/savingGoalsRouter";



import { syncDatabase } from "../config/db/dbConection";
import cron from 'node-cron';
import {UserSession} from "../interface/UserSession";


declare module "express-session" {
    interface SessionData {
      user?: UserSession; //defino atributo que estara presente en mis solicitudes
    }
}


const workerDebtsNotify = new Worker('./dist/workers/workerNotify.js');

syncDatabase();
dotenv.config();
const PORT = process.env.PORT;
const app = express();
const  secretjwt =process.env.SECRETJWT;

if(!secretjwt){
    throw new Error("No hay clave secreta para JWT");
}

app.use(session({
    secret: secretjwt,
    resave: false,
    saveUninitialized: true,
  })); //habilita la session para las solicitudes

app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); 


app.use(routerExpense);
app.use(routerIncome); 
app.use(routerSession); 
app.use(routerUser);
app.use(routerCategory);
app.use(routerDebts);
app.use(routerSummary)
app.use(routerSavingGoals);
 

cron.schedule('0 0 * * *', () => {
    workerDebtsNotify.postMessage('SendNotify');
});


const bootstrap = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Servidor en ejecución en el puerto ${PORT}`);
        });
        } catch (err) {
        console.log(err);
    }
}

bootstrap();
    