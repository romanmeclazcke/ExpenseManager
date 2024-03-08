import bcrypt from 'bcrypt';

export const encryptPassword= async (password)=>{
    try{
        const hashPassword= await bcrypt.hash(password, 10);

        return  hashPassword;
    }catch(err){
        console.log(err)
    }
}

export  const verifyPasswordSecurity= async (plainPassword, hashedPassword)=>{
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return match;
    } catch (error) {
      console.error("Error al comparar contraseñas:", error);
      throw error; 
    }
  }