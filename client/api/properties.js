import API from "../utils/api";

export const properties=async(userId)=>{
    try{
        const response=await API.get(`/user/${userId}/properties`);
        console.log(response);
        return response.data;
    }catch(err){
        console.log('error in getting Property List',err.message);
    }
}