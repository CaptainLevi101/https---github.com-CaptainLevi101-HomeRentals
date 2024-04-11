import React, { useEffect, useState } from 'react'
import {categories} from '../pages/CreateListing';
import ListingCard from './ListingCard';
import {useDispatch,useSelector} from 'react-redux';
import * as API from '../../api/listing';
import { setListings } from '../redux/state';
import Loader from './Loader';



const Listings = () => {
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(true);
  const [selectedCategory,setSelectedCategory]=useState("All");

  const listings=useSelector((state)=>state.listings);
  const getFeedListing=async()=>{
    try{
      const response=await API.feedListing(selectedCategory);
      dispatch(setListings(response));
      setLoading(false);

    }catch(err){
         console.log('Fetch Listings failed',err.message);
    }
  }
  useEffect(()=>{
    getFeedListing();
  },[selectedCategory]);
  
 
  return (
    <>
    <div className='categories_list flex gap-8 flex-wrap items-center justify-center p-8'>
      {categories?.map((category,index)=>(
        <div 
        onClick={()=>setSelectedCategory(category.label)}
        className={`${category.label==selectedCategory?'bg-blue-600 text-white':''} hover:bg-blue-200 rounded-xl category flex flex-col items-center gap-1 justify-center cursor-pointer w-44 h-44`} 
        key={index}>
          <div className='icon text-5xl text-gray-900'>{category.icon}</div>
          <p className='text-xl'>{category.label}</p>
          </div>
      ))}
    </div>

    {loading ? <Loader/>:(
      <div className='listings flex flex-wrap justify-center items-center gap-8'>
        {listings.map((listing,index)=>(
          <ListingCard key={index} card={listing}/>
        ))}
      </div>
    )}


    </>
  )
}

export default Listings
