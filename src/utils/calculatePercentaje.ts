export const calculatePercentage = async (ultimateGoal : number, currentAmount:number )=>{
  try {
    return Math.trunc((currentAmount/ultimateGoal)*100);
  } catch (error) {
    throw new Error('Error al calcular el porcentaje actual de la meta');
  }   
}