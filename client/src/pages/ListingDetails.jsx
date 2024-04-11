import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { findListingDetails } from '../../api/listing';
import { createBooking, getBoookingDetails } from "../../api/bookings";
import { useSelector } from 'react-redux';
import { facilities } from "./CreateListing";
import Footer from "../components/Footer";
import PricingCard from "../components/PricingCard";


const ListingDetails = () => {
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [disabledDatings, setDisabledDatings] = useState([]);


  const getListingDetails = async () => {
    try {
      const response = await findListingDetails(listingId);

      setListing(response);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };



  useEffect(() => {
    getListingDetails();
    getBookings();
  }, []);




  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);



  let dateArray = [];
  const getBookings = async () => {
    try {
      const response = await getBoookingDetails(listingId);
      response.map((item) => {
        let currentDate = new Date(item.startDate);
        const endDateObj = new Date(item.endDate);

        while (currentDate <= endDateObj) {
          dateArray.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

      })
      setDisabledDatings(dateArray);
       

    } catch (err) {
      console.log('Error in getting Bookings:', err);
    }
  };


  // console.log();
  // console.log(dateRange[0].startDate);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id)

  const navigate = useNavigate()


  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      }
      // console.log(bookingForm);
      const response = await createBooking(bookingForm);
      if (response) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message)
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <div className="listing-details flex flex-col gap-4 p-8 mt-2">
        <div className="title text-2xl mb-5 text-blue-800">
          <h1>{listing?.title}</h1>
          <div></div>
        </div>

        <div className="pb-8  border-b border-gray-400 mb-4 photos flex items-center justify-center gap-4 flex-wrap">
          {listing.cloudPhotos?.map((item, index) => (
            <img
              className="rounded-xl w-[280px] h-[220px]"
              key={index}
              src={item}
              alt="listing photo"
            />
          ))}
        </div>

        <h2 className="text-2xl m-4">
          {listing.type} in {listing.city}, {listing.state},{" "}
          {listing.country}
        </h2>
        <p className="m-4 -mt-4 font-semibold">
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>


        <div className="profile p-6 border-b border-gray-400 mb-4">
          <img
            className="w-[150px] h-[150px] rounded-xl "
            src={listing.creator.profileImagePath}
          />
          <h3 className="font-semibold">
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>

        <div className="p-4 border-b border-gray-400 mb-4">
          <h3 className="text-2xl font-semibold">Description</h3>
          <p className="p-4 border-b text-xl border-gray-200 mb-4">{listing.description}</p>


          <h3 className="p-1">{listing.highlight}</h3>
          <p className="p-1">{listing.highlightDesc}</p>
          <hr />

        </div>
        <div className="booking p-12 flex flex-wrap justify-between ">
          <div className="border-b border-gray-400 ">
            <h2 className="text-2xl font-semibold">What this place offers?</h2>
            <div className="amenities flex flex-wrap gap-4 p-4">
              {listing.amenities.map((item, index) => (
                <div className="facility flex flex-col items-center justify-center
                 gap-1 mb-4 border border-gray-400 rounded-xl p-4" key={index}>
                  <div className="facility_icon text-4xl">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p className="text-xl">{item}</p>
                </div>
              ))}
            </div>
          </div>



          <div className="date-range-calendar pl-8 rounded-xl 
             flex flex-col items-center justify-center">
            <h2 className="text-2xl pb-4">How long do you want to stay?</h2>
            <DateRange
              className="rounded-xl mt-6 h-[350px]"
              ranges={dateRange}
              onChange={handleSelect}
              disabledDates={disabledDatings}
              minDate={new Date()}

            />

          </div>
        </div>
        <PricingCard
          startDate={dateRange[0].startDate.toDateString()}
          endDate={dateRange[0].endDate.toDateString()}
          price={listing.price}
          dayCount={dayCount}
          handleSubmit={handleSubmit}
        />
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;