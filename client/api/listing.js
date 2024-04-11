import API from '../utils/api';


export const createListing=async(formData)=>{
    try{
        const response=await API.post('/listing/create',formData);
        return response.data;
        
    }catch(err){
         console.log("error in creating List",err);
    }
}

export const feedListing=async(selectedCategory)=>{
  try{
    const response=await API.get(`/listing/getFeed/?category=${selectedCategory}`);
  
    return response.data;

  }catch(err){

  }
}


export const findListingDetails=async(id)=>{
  try{
    const response=await API.get(`/listing/listingDetails/${id}`);
   
    return response.data;

  }catch(err){
    console.log("Fetch Listing Details Failed", err.message);
  }


}


export const getListingBySearch=async(search)=>{
  try{
    const response=await API.get(`/listing/search/${search}`);
    return response.data;

  }catch(err){
    console.log('error in getting listing by category',err);
  }
}