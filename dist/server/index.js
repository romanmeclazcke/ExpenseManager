"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const worker_threads_1 = require("worker_threads");
// Importar los router
const expenseRouter_1 = __importDefault(require("../routes/expenseRouter"));
const incomeRouter_1 = __importDefault(require("../routes/incomeRouter"));
const userRouter_1 = __importDefault(require("../routes/userRouter"));
const sessionRouter_1 = __importDefault(require("../routes/sessionRouter"));
const categoryRouter_1 = __importDefault(require("../routes/categoryRouter"));
const debtsRouter_1 = __importDefault(require("../routes/debtsRouter"));
const summaryRouter_1 = __importDefault(require("../routes/summaryRouter"));
const savingGoalsRouter_1 = __importDefault(require("../routes/savingGoalsRouter"));
const dbConection_1 = require("../config/db/dbConection");
const node_cron_1 = __importDefault(require("node-cron"));
const workerDebtsNotify = new worker_threads_1.Worker('./dist/workers/workerNotify.js');
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const secretjwt = process.env.SECRETJWT;
if (!secretjwt) {
    throw new Error("No hay clave secreta para JWT");
}
app.use((0, express_session_1.default)({
    secret: secretjwt,
    resave: false,
    saveUninitialized: true,
})); //habilita la session para las solicitudes
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(expenseRouter_1.default);
app.use(incomeRouter_1.default);
app.use(sessionRouter_1.default);
app.use(userRouter_1.default);
app.use(categoryRouter_1.default);
app.use(debtsRouter_1.default);
app.use(summaryRouter_1.default);
app.use(savingGoalsRouter_1.default);
(0, dbConection_1.syncDatabase)();
node_cron_1.default.schedule('*/15 * * * * *', () => {
    workerDebtsNotify.postMessage('SendNotify');
});
const bootstrap = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Servidor en ejecución en el puerto ${PORT}`);
        });
    }
    catch (err) {
        console.log(err);
    }
};
bootstrap();
