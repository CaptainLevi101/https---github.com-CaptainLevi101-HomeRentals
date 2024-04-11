import API from '../utils/api';

export const createBooking=async(formData)=>{
    try{
        const response=await API.post('/bookings/create', formData);
        return response.data;
    }catch(err){
        console.log("Submit Booking Failed.", err.message)
    }
   
}

export const getBoookingDetails=async(listingId)=>{
    try{
        const response=await API.get(`/bookings/getBookingDetails/${listingId}`);
        
        return response.data;
    }catch(err){
        console.log("error in getting booking Details",err.message);
    }
}