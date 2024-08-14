import bcrypt from 'bcrypt';

export const encryptPassword= async (password:string)=>{
    try{
        const hashPassword= await bcrypt.hash(password, 10);
        return  hashPassword;
    }catch(err){
      throw new Error('Error al encriptar la contraseña');

    }
}

export  const verifyPasswordSecurity= async (plainPassword:string, hashedPassword:string)=>{
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return match;
    } catch (error) {
      throw new Error('Error al verificar la contraseña.');

    }
  }