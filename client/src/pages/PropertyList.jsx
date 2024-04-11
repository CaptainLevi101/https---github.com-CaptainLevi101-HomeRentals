import React, { useEffect, useState } from 'react'
import { properties } from '../../api/properties';
import {useSelector,useDispatch} from 'react-redux';
import { setPropertyList } from '../redux/state';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListingCard2 from '../components/ListingCard2';
import ListingCard from '../components/ListingCard';

const PropertyList = () => {
  const [loading,setLoading]=useState(true);
  const user=useSelector((state)=>state.user);
  const userId=user._id;
  const dispatch=useDispatch();
  const propertyList = user?.propertyList;

  const getPropertyList=async()=>{
    try{
      const response=await properties(userId);
      dispatch(setPropertyList(response));
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
      <h1 className="text-4xl font-semibold mt-12">Property List</h1>
          <div className="flex flex-wrap items-center justify-center p-8 gap-8 relative">
      {propertyList?.map(
          (item,index) => (
            <ListingCard
              key={index}
               card={item}
            />
          )
        )}
        </div>
      <Footer/>
      </>}
      </>
  )
}

export default PropertyList
