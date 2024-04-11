import React, { useEffect, useState } from 'react';
import * as API from '../../api/auth';
import { User,CircleUserIcon, Menu, Search, ShoppingCart } from 'lucide-react'
import {Link, useNavigate,useLocation} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

import { Axios } from 'axios';
import { setLogout } from '../redux/state';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [query, setQuery] = useState('');
    const user=useSelector((state)=>state.user);
    const [image,setImage]=useState('');;
    const location = useLocation();
    const {pathname}=location;

    const segments = pathname.split('/');
    const score = segments[segments.length - 1];
    
  

    const toggleDropdown = () => {
        setDropdownMenu(false);
        setIsDropdownOpen(!isDropdownOpen);
    };

    // useEffect(()=>{
    //     const getImage=async()=>{
    //     }
    //     getImage();
    // },[]);
   
    

    return (
        <div className='sticky top-0 z-10 py-2 px-10
    flex justify-between items-center bg-image bg-cover bg-center backdrop-blur-md'>
            <Link to="/">
                <img src="/assets/logo.png" alt='logo' width={130} height={100} />
            </Link>
            <div className='gap-6 hidden lg:flex' style={{ fontSize: '16px', fontWeight: '600' }}>
                <Link to="/" className={`${score===""?'text-blue-800':''} hover:text-red-400 `}>Home</Link>
                <Link to={user ? `/${user._id}/trips` : "/login"} className={`${score==="trips"?'text-blue-800':''} hover:text-red-400`}>Trip List</Link>
                <Link to={user ? `/${user._id}/wishlist` : "/login"}className={`${score==="wishlist"?'text-blue-800':''} hover:text-red-400`}>Wish List</Link>
                <Link to={user ?   `/${user._id}/propertylist` : "/login"} className={`${score==="propertylist"?'text-blue-800':''} hover:text-red-400`}>Property List</Link>
                <Link to={user ?    `${user._id}/reservationlist` : "/login"} className={`${score==="reservationlist"?'text-blue-800':''} hover:text-red-400`}>Reservation List</Link>
                <Link to={user ? "/create-listing" : "/login"} className={`${score==="create-listing"?'text-blue-800':''} hover:text-red-400`}>Become a Host</Link>
               
            </div>
            <div className=' flex gap-3 border border-gray-400 px-3
       py-1 items-center rounded-lg'>
                <input className='outline-none sm:w-auto md:w-72 lg:w-96 p-2 '
                    placeholder='Search...' value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button disabled={query == ""} onClick={() => navigate(`/search/${query}`)}>
                    <Search className='cursor-pointer h-4 w-4 hover:text-red-400' />
                </button>

            </div>


            <div className='relative flex gap-3 items-center'>
                <Menu className='lg:hidden cursor-pointer' onClick={() => 
                {setDropdownMenu(!dropdownMenu)
                setIsDropdownOpen(false);
                } 
            }/>
                {dropdownMenu && user && (
                    <div className='absolute top-10 right-5 flex flex-col
           gap-4 p-3 rounded-lg bg-white  transition-all lg:hidden' style={{ fontSize: '16px', fontWeight: '600' }}>
                        <Link to="/" className='hover:text-red-400'>Home</Link>
                        <Link to= {`/${user._id}/trips`} className='hover:text-red-400'>Trip List</Link>
                        <Link to= {user ? `/${user._id}/wishlist` : "/login"} className='hover:text-red-400'>Wish List</Link>
                        <Link to= {user ? `/${user._id}/propertylist` : "/login"} className='hover:text-red-400'>Property List</Link>
                        <Link to= {user ? `/${user._id}/reservationlist` : "/login"} className='hover:text-red-400'>Reservation List</Link>
                        <Link to= {user ? `/${user._id}/` : "/login"} className='hover:text-red-400'>Become a Host</Link>
                        <button onClick={()=>dispatch(setLogout())} className='hover:text-red-400 -ml-8'>Logout</button>
                    </div>
                )}
                 {dropdownMenu && !user && (
                    <div className='absolute top-10 right-5 flex flex-col
           gap-4 p-3 rounded-lg bg-white  transition-all lg:hidden' style={{ fontSize: '16px', fontWeight: '600' }}>
                        <Link to="/login" className='hover:text-red-1'>Login</Link>
                        <Link to="/register" className='hover:text-red-1'>SignUp</Link>   
                    </div>
                )}
                {/* <img src={user.proflieImagePath} alt="user image" height="50px" width="40px"/> */}
                {user ? 
               <div className="relative">
               <img
                   src={user.profileImagePath}
                   className="rounded-xl cursor-pointer"
                   alt="user image"
                   height="50px"
                   width="40px"
                   onClick={toggleDropdown}
               />
               {/* Dropdown menu */}
               {isDropdownOpen && (
                   <div className="absolute top-10 right-0 bg-white border border-gray-300 rounded-lg shadow-md px-5 py-4">
                       <button onClick={()=>dispatch(setLogout())} className='hover:text-red-400'>Logout</button>
                   </div>
               )}
           </div>: 
                (<Link to='/login'><CircleUserIcon /></Link>)}
            </div>
        </div>
    )
}

export default Navbar
