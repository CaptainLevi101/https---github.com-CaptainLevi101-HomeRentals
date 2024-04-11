import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard2 from "../components/ListingCard2";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);
  console.log(wishList);

  return (
    <>
      {wishList.length === 0 ? (
        <>
         <Navbar />
         <Loader />
         <Footer/>
        </>
        
      ) : (
        <>
          <Navbar />
          <h1 className="text-4xl font-semibold mt-12">Your Wish List</h1>
          <div className="flex flex-wrap items-center justify-center p-8 gap-8 relative">
            {wishList?.map(
              (
                {
                  _id,
                  creator,
                  cloudPhotos,
                  city,
                  state,
                  country,
                  category,
                  amenities,
                  type,
                  price,
                  highlightDesc,
                  booking = false,
                },
                index
              ) => (
                <ListingCard2
                  key={index}
                  listingId={_id}
                  creator={creator}
                  cloudPhotos={cloudPhotos}
                  city={city}
                  state={state}
                  country={country}
                  category={category}
                  type={type}
                  price={price}
                  booking={booking}
                  amenities={amenities}
                  highlightDesc={highlightDesc}
                />
              )
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default WishList;
