import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Importar los router
import routerExpense from "../routes/expenseRouter.js";
import routerIncome from "../routes/incomeRouter.js";
import routerUser from "../routes/userRouter.js";
import routerSession from "../routes/sessionRouter.js";
import routerCategory from "../routes/categoryRouter.js";


import { syncDatabase } from "../config/db/dbConection.js";


dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); 

app.use(routerExpense);
app.use(routerIncome); 
app.use(routerSession); 
app.use(routerUser)
app.use(routerCategory)

syncDatabase();


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
