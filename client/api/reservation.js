import API from "../utils/api";

export const reservations=async(userId)=>{
    try{
        const response=await API.get(`/user/${userId}/reservations`);
        // console.log(response);
        return response.data;
    }catch(err){
        console.log('error in getting Property List',err.message);
    }
}