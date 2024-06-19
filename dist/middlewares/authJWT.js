"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySession = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifySession = (req, res, next) => {
    // Obtener el token de la solicitud
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado', details: false });
    }
    const secret = process.env.SECRETJWT;
    const authToken = token.replace(/bearer/gim, '').trim(); // Dividir el bearer token y quedarse solo con el token
    req.session = { user: null };
    // Verificar el token
    try {
        const data = jsonwebtoken_1.default.verify(authToken, secret);
        if (data) {
            req.session.user = data;
        }
    }
    catch (error) {
        req.session.user = null;
    }
    next();
};
exports.verifySession = verifySession;
