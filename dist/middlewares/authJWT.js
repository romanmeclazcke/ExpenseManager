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
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    const secret = process.env.SECRETJWT;
    if (!secret) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
    const authToken = token.replace(/bearer/gim, '').trim(); // Limpiar el token Bearer y obtener solo el token
    try {
        const decoded = jsonwebtoken_1.default.verify(authToken, secret); // Decodificar el token JWT
        if (decoded && typeof decoded === 'object' && decoded.id && decoded.name) {
            const { id, name } = decoded; // Extraer id y name del objeto decoded
            // Guardar los datos en la sesión
            req.session.user = { id, name };
            next();
        }
        else {
            return res.status(401).json({ error: 'Token inválido' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.verifySession = verifySession;
