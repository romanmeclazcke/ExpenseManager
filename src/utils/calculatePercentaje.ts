export const calculatePercentage = async (ultimateGoal : number, currentAmount:number )=>{
  try {
    return Math.round((currentAmount/ultimateGoal)*100);
  } catch (error) {
    console.log(error)
  }   
}