import React, { useState,useEffect } from 'react'
import {useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { getListingBySearch } from '../../api/listing';
import { setListings } from '../redux/state';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import ListingCard2 from '../components/ListingCard2';

const SearchPage = () => {
    const {search}=useParams();
    const [loading,setLoading]=useState(true);
    const listings=useSelector((state)=>state.listings);
    const dispatch=useDispatch();
 
    const getSearchListings=async()=>{
        try{
            const response=await getListingBySearch(search);
            dispatch(setListings(response));
            setLoading(false);
        }catch(err){
            console.log('error in getting search Page');
        }
    }
    useEffect(()=>{
        getSearchListings();
    },[])
      
    return (
        <>
          {loading ? (
            <>
             <Navbar />
             <Loader />
             <Footer/>
            </>
            
          ) : (
            <>
              <Navbar />
              <h1 className="text-4xl font-semibold mt-12">Search Results ....</h1>
              <div className="flex flex-wrap items-center justify-center p-8 gap-8 relative">
                {listings?.map(
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
}

export default SearchPage
