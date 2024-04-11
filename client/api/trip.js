import API from '../utils/api';

export const gettingTripList=async(userId)=>{
    try{
        const response=await API.get(`/user/${userId}/trips`);
        return response.data;
    }catch(err){
        console.log('error in getting trip List',err);
    }
   
}