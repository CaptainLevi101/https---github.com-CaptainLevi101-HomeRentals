import API from '../utils/api';

export const handleWish=async({userId,listingId})=>{
    try{
        const response=await API.patch(`/user/${userId}/${listingId}`);
        // console.log(response.data);
        return response.data.wishList;
    }catch(err){
        console.log('Error in Updating Like',err);
    }
}