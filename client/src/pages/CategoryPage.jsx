import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { getListingByCategory } from '../../api/category';
import { setListings } from '../redux/state';
import ListingCard from '../components/ListingCard';
import { feedListing } from '../../api/listing';

const CategoryPage = () => {
    const [loading,setLoading]=useState(true);
    const {category}=useParams();
    const dispatch=useDispatch();
    const listings=useSelector((state)=>state.listings);

    const getFeedListing=async()=>{
        try{
            const response=await feedListing(category);
            dispatch(setListings(response));
            setLoading(false);
        }catch(err){
            console.log('error in getting listing By Category');
        }
    }
    useEffect(()=>{
        getFeedListing();
    },[]);

  return (
    <div>
        <Navbar/>
        {loading ? <>
        <Loader/>
        </>:<>
        <div className='listings flex flex-wrap justify-center items-center gap-8'>
        {listings.map((listing,index)=>(
          <ListingCard key={index} card={listing}/>
        ))}
      </div>
        </>
        } 
       <Footer/>
    </div>
  )
}

export default CategoryPage
