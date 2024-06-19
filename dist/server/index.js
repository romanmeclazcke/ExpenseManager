"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// Importar los router
const expenseRouter_1 = __importDefault(require("../routes/expenseRouter"));
const incomeRouter_1 = __importDefault(require("../routes/incomeRouter"));
const userRouter_1 = __importDefault(require("../routes/userRouter"));
const sessionRouter_1 = __importDefault(require("../routes/sessionRouter"));
const categoryRouter_1 = __importDefault(require("../routes/categoryRouter"));
const debtsModel_1 = __importDefault(require("../routes/debtsModel"));
const dbConection_1 = require("../config/db/dbConection");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(expenseRouter_1.default);
app.use(incomeRouter_1.default);
app.use(sessionRouter_1.default);
app.use(userRouter_1.default);
app.use(categoryRouter_1.default);
app.use(debtsModel_1.default);
(0, dbConection_1.syncDatabase)();
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
