export const validateOwnerDataIdUser = async(idUserRequest,dataUser)=>{
    console.log(idUserRequest, dataUser.id);
    if(idUserRequest == dataUser.id){
        return true;
    }
    return false;
}