import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';



export const verifySession = (req:Request, res:Response, next:NextFunction) => {
    // Obtener el token de la solicitud
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado', details: false });
    }

    const secret = process.env.SECRETJWT

    if (!secret) {
        return res.status(401).json({message:"secret not found", details:false})

    }

    const authToken = token.replace(/bearer/gim, '').trim(); // Dividir el bearer token y quedarse solo con el token

    req.session.user = {id:'', name:''};
    // Verificar el token
    try{
        const data =  jwt.verify(authToken, secret);
        console.log(data);
        if(data){
            //req.session.user =data;
        }   
    }catch(error){
        //req.session.user=null
    }
    next();   
};




