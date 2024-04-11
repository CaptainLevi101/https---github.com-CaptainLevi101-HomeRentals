import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreateListing from './pages/CreateListing';
import ListingDetails from './pages/ListingDetails';
import TripList from './pages/TripList';
import WishList from './pages/WishList';
import PropertyList from './pages/PropertyList';
import ReservationList from './pages/ReservationList';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import {useSelector} from 'react-redux';

const App = () => {
  const user=useSelector((state)=>state.user);
 
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        {user && <>
         <Route path='/create-listing' element={<CreateListing/>}/>
         <Route path='/properties/:listingId' element={<ListingDetails/>}/>
         <Route path='/:userId/trips' element={<TripList/>}/>
         <Route path='/:userId/wishlist' element={<WishList/>}/>
         <Route path='/:userId/propertylist' element={<PropertyList/>}/>
         <Route path='/:userId/reservationlist' element={<ReservationList/>}/>
         <Route path='/properties/category/:category' element={<CategoryPage/>}/>
         <Route path='/search/:search' element={<SearchPage/>}/>
         </>
        }
         {!user && <>
         <Route path='/create-listing' element={<LoginPage/>}/>
         <Route path='/properties/:listingId' element={<LoginPage/>}/>
         <Route path='/:userId/trips' element={<LoginPage/>}/>
         <Route path='/:userId/wishlist' element={<LoginPage/>}/>
         <Route path='/:userId/propertylist' element={<LoginPage/>}/>
         <Route path='/:userId/reservationlist' element={<LoginPage/>}/>
         <Route path='/properties/category/:category' element={<LoginPage/>}/>
         <Route path='/search/:search' element={<LoginPage/>}/>
         </>
        }
      </Routes>
      </BrowserRouter>
      </>
    
  )
}

export default App
