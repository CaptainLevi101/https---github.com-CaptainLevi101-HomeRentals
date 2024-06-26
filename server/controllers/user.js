import Booking from "../models/Booking.js";
import User from '../models/User.js';
import Listing from '../models/Listing.js';
export const userTripsController = async (req, res) => {
    try {
        const { userId } = req.params;
        const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId");
        res.status(202).json(trips);

    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "cannot find trips", error: err.message });

    }
}

export const addWishListController = async (req, res) => {
    try {
        const { userId, listingId } = req.params;
        const user = await User.findById(userId);
        const listing = await Listing.findById(listingId).populate("creator");
        console.log(listing._id.toString());
        const favouriteListing = user.wishList.find((item) => item._id.toString() === listingId);
        // console.log(favouriteListing);
        if (favouriteListing) {
            user.wishList = user.wishList.filter((item) => item._id.toString()!== listingId);
            await user.save();
            res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList })
        } else {
            user.wishList.push(listing)
            await user.save()
            res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList })
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}


export const getPropertiesController=async(req,res)=>{
    try{
        
        const {userId}=req.params;
        const properties=await Listing.find({creator:userId}).populate("creator");
         res.status(200).json(properties);
    }catch(err){
        console.log(err)
        res.status(404).json({ message: "Can not find properties!", error: err.message })
    }
}

export const getReservationsController=async(req,res)=>{
    try{
        const { userId } = req.params;
        const reservations=await Booking.find({hostId:userId}).populate("customerId hostId listingId");
        res.status(202).json(reservations);

    }catch(err){
        console.log(err)
        res.status(404).json({ message: "Can not find reservations!", error: err.message })
    }
}