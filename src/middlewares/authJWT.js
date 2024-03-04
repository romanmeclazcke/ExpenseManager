import {jwt} from "jsonwebtoken"

export const verifySession = async(req, res)=> {
    // Obtener el token de la solicitud
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado',details:false});
    }
    const secret= process.env.SECRET
  
    // Verificar el token
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido',details:false });
      }

      // El token es válido, puedes hacer lo que necesites con decoded, que contiene la información decodificada del token
      const usuario = decoded.usuario;
      res.json({ mensaje: usuario, details:true });
    });
}
