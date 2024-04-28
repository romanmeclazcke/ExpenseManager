import jwt from 'jsonwebtoken';



export const verifySession = (req, res, next) => {
    // Obtener el token de la solicitud
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado', details: false });
    }
    const secret = process.env.SECRETJWT;

    const authToken = token.replace(/bearer/gim, '').trim(); // Dividir el bearer token y quedarse solo con el token
    // Verificar el token
    jwt.verify(authToken, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido', details: err });
        }

        // El token es válido, puedes hacer lo que necesites con decoded, que contiene la información decodificada del token
        const usuario = decoded.usuario;
        // Al llamar a next(), el control se pasa al siguiente middleware o controlador
        next();
    });
};

