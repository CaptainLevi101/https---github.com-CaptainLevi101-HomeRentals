import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { gettingTripList } from "../../api/trip";
import ListingCard2 from "../components/ListingCard2";
import {useParams,useLocation} from 'react-router-dom';

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await gettingTripList(userId);
      dispatch(setTripList(response));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };
  const params=useParams();
 
 

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="ml-6 mt-12 title-list text-4xl font-semibold font-serif">Your Trip List</h1>
      <div className="list">
       
        {tripList?.map((item,index) => {

          const { listingId, hostId, startDate, endDate, totalPrice, booking=true }=item;
        //   console.log(listingId.cloudPhotos);
          return <ListingCard2
          key={index}
          listingId={listingId._id}
          amenities={listingId.amenities}
          creator={hostId._id}
          cloudPhotos={listingId?.cloudPhotos}
          city={listingId.city}
          state={listingId.state}
          country={listingId.country}
          category={listingId.category}
          startDate={startDate}
          endDate={endDate}
          totalPrice={totalPrice}
          booking={booking}
          />
})}
      </div>
      <Footer />
    </>
  );
};

export default TripList;