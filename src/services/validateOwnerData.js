export const validateOwnerDataIdUser = async(idUserRequest,dataUser)=>{
    if(idUserRequest == dataUser.id){
        return true;
    }
    return false;
}


export const validateDataIdAndDataIdUser= async (dataId,dataIdUser)=>{
    console.log(dataId,dataIdUser);
    if(dataId == dataIdUser){
        return true;
    }
    return false;
}