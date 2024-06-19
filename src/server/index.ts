import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Importar los router
import routerExpense from "../routes/expenseRouter";
import routerIncome from "../routes/incomeRouter";
import routerUser from "../routes/userRouter";
import routerSession from "../routes/sessionRouter";
import routerCategory from "../routes/categoryRouter";
import routerDebts from "../routes/debtsModel";
import { syncDatabase } from "../config/db/dbConection";



dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); 

app.use(routerExpense);
app.use(routerIncome); 
app.use(routerSession); 
app.use(routerUser);
app.use(routerCategory);
app.use(routerDebts);

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
