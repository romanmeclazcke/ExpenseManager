import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Importar los router
import routerExpense from "../routes/expenseRouter.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); 

app.use(routerExpense); // No estás utilizando routerExpense, así que puedes comentarlo temporalmente o eliminarlo

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
