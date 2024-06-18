import jwt from 'jsonwebtoken';



export const verifySession = (req, res, next) => {
    // Obtener el token de la solicitud
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado', details: false });
    }
    const secret = process.env.SECRETJWT;

    const authToken = token.replace(/bearer/gim, '').trim(); // Dividir el bearer token y quedarse solo con el token

    req.session = { user:null };
    // Verificar el token
    try{
        const data =  jwt.verify(authToken, secret);
        if(data){
            req.session.user =data;
        }   
    }catch(error){
        req.session.user=null
    }
    next();   
};




