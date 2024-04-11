import React, { useEffect, useState } from 'react'
import { properties } from '../../api/properties';
import {useSelector,useDispatch} from 'react-redux';
import { setPropertyList, setReservationList } from '../redux/state';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListingCard2 from '../components/ListingCard2';
import ListingCard from '../components/ListingCard';
import { reservations } from '../../api/reservation';

const ReservationList = () => {
  const [loading,setLoading]=useState(true);
  const user=useSelector((state)=>state.user);
  const userId=user._id;
  const dispatch=useDispatch();
  const reservationList = user?.reservationList;
   console.log(reservationList);
  const getPropertyList=async()=>{
    try{
      const response=await reservations(userId);
      dispatch(setReservationList(response));
      setLoading(false);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
     getPropertyList();
  },[])


  return (
      <>
      {loading ?<>
      <Navbar/>
      <Loader/>
      <Footer/>
      </>:<>
      <Navbar/>
      <h1 className="text-4xl font-semibold mt-12">Reservations at your Venue</h1>
          <div className="flex flex-wrap items-center justify-center p-8 gap-8 relative">
          {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true },index) => (
          <ListingCard2
            key={index}
            amenities={listingId.amenities}
            listingId={listingId._id}
            creator={hostId._id}
            cloudPhotos={listingId.cloudPhotos}
            city={listingId.city}
            province={listingId.province}
            country={listingId.country}
            category={listingId.category}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={booking}
          />
        ))}
        </div>
      <Footer/>
      </>}
      </>
  )
}

export default ReservationList;
