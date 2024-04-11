import API from "../utils/api";

export const getListingByCategory=async(category)=>{
    try{
        const response=await API.get(`/user/properties?category=${category}`);
        return response.data;
    }catch(error){
        console.log('error in getting listing by category',err);
    }
}