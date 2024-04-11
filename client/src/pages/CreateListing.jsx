import React from 'react'

import Navbar from "../components/Navbar";
import icons from '../icons';
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"
import * as API from '../../api/listing';



export const categories = [
  {
    label: "All",
    icon: <icons.BiWorld />,
  },
  {
    img: "assets/beach_cat.jpg",
    label: "Beachfront",
    icon: <icons.TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    img: "assets/windmill_cat.webp",
    label: "Windmills",
    icon: <icons.GiWindmill />,
    description: "This property has windmills!",
  },
  {
    img: "assets/modern_cat.webp",
    label: "Iconic cities",
    icon: <icons.MdOutlineVilla />,
    description: "This property is modern!",
  },
  {
    img: "assets/countryside_cat.webp",
    label: "Countryside",
    icon: <icons.TbMountain />,
    description: "This property is in the countryside!",
  },
  {
    img: "assets/pool_cat.jpg",
    label: "Amazing Pools",
    icon: <icons.TbPool />,
    description: "This property has a beautiful pool!",
  },
  {
    img: "assets/island_cat.webp",
    label: "Islands",
    icon: <icons.GiIsland />,
    description: "This property is on an island!",
  },
  {
    img: "assets/lake_cat.webp",
    label: "Lakefront",
    icon: <icons.GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    img: "assets/skiing_cat.jpg",
    label: "Ski-in/out",
    icon: <icons.FaSkiing />,
    description: "This property has skiing activities!",
  },
  {
    img: "assets/castle_cat.webp",
    label: "Castles",
    icon: <icons.GiCastle />,
    description: "This property is an ancient castle!",
  },
  {
    img: "assets/cave_cat.jpg",
    label: "Caves",
    icon: <icons.GiCaveEntrance />,
    description: "This property is in a spooky cave!",
  },
  {
    img: "assets/camping_cat.jpg",
    label: "Camping",
    icon: <icons.GiForestCamp />,
    description: "This property offers camping activities!",
  },
  {
    img: "assets/arctic_cat.webp",
    label: "Arctic",
    icon: <icons.BsSnow />,
    description: "This property is in arctic environment!",
  },
  {
    img: "assets/desert_cat.webp",
    label: "Desert",
    icon: <icons.GiCactus />,
    description: "This property is in the desert!",
  },
  {
    img: "assets/barn_cat.jpg",
    label: "Barns",
    icon: <icons.GiBarn />,
    description: "This property is in a barn!",
  },
  {
    img: "assets/lux_cat.jpg",
    label: "Luxury",
    icon: <icons.IoDiamond />,
    description: "This property is brand new and luxurious!",
  },
];



const types = [
  {
    name: 'An entire place',
    description: 'Guests have the whole place to themselves',
    icon: <icons.FaHouseUser />,
  },
  {
    name: 'Room(s)',
    description:
      'Guests have their own room in a house, plus access to shared places',
    icon: <icons.BsFillDoorOpenFill />,
  },
  {
    name: 'A Shared Room',
    description:
      'Guests sleep in a room or common area that may be shared with you or others',
    icon: <icons.FaPeopleRoof />,
  },
];



export const facilities = [
  {
    name: "Bath tub",
    icon: <icons.PiBathtubFill />,
  },
  {
    name: "Personal care products",
    icon: <icons.FaPumpSoap />,
  },
  {
    name: "Outdoor shower",
    icon: <icons.FaShower />,
  },
  {
    name: "Washer",
    icon: <icons.BiSolidWasher />,
  },
  {
    name: "Dryer",
    icon: <icons.BiSolidDryer />,
  },
  {
    name: "Hangers",
    icon: <icons.PiCoatHangerFill />,
  },
  {
    name: "Iron",
    icon: <icons.TbIroning3 />,
  },
  {
    name: "TV",
    icon: <icons.PiTelevisionFill />,
  },
  {
    name: "Dedicated workspace",
    icon: <icons.BsPersonWorkspace />
  },
  {
    name: "Air Conditioning",
    icon: <icons.BsSnow />,
  },
  {
    name: "Heating",
    icon: <icons.GiHeatHaze />,
  },
  {
    name: "Security cameras",
    icon: <icons.GiCctvCamera />,
  },
  {
    name: "Fire extinguisher",
    icon: <icons.FaFireExtinguisher />,
  },
  {
    name: "First Aid",
    icon: <icons.BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <icons.BiWifi />,
  },
  {
    name: "Cooking set",
    icon: <icons.FaKitchenSet />,
  },
  {
    name: "Refrigerator",
    icon: <icons.BiSolidFridge />,
  },
  {
    name: "Microwave",
    icon: <icons.MdMicrowave />,
  },
  {
    name: "Stove",
    icon: <icons.GiToaster />,
  },
  {
    name: "Barbecue grill",
    icon: <icons.GiBarbecue />,
  },
  {
    name: "Outdoor dining area",
    icon: <icons.FaUmbrellaBeach />,
  },
  {
    name: "Private patio or Balcony",
    icon: <icons.MdBalcony />,
  },
  {
    name: "Camp fire",
    icon: <icons.GiCampfire />,
  },
  {
    name: "Garden",
    icon: <icons.MdYard />,
  },
  {
    name: "Free parking",
    icon: <icons.AiFillCar />,
  },
  {
    name: "Self check-in",
    icon: <icons.FaKey />
  },
  {
    name: " Pet allowed",
    icon: <icons.MdPets />
  }
];










const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    country: "",
  });
  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    const photoArray = [];
  
    // Loop through each uploaded file
    for (let i = 0; i < newPhotos.length; i++) {
      const reader = new FileReader();
  
      // Closure to capture the file information
      reader.onload = (event) => {
        // Push the base64 data to the array
        photoArray.push(event.target.result);
        
        // Check if all files have been processed
        if (photoArray.length === newPhotos.length) {
          // Update state with base64 encoded photos
          setPhotos((prevPhotos) => [...prevPhotos, ...photoArray]);
        }
      };
  
      // Read the file as a data URL (base64 format)
      reader.readAsDataURL(newPhotos[i]);
    }
  };
  

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };
  
  const creatorId = useSelector((state) => state.user._id);

  const navigate = useNavigate();

  const handlePost = async(e) => {
    e.preventDefault();
    const formData={
      "creator":creatorId,
      "category": category,
      "type":type,
      "streetAddress":formLocation.streetAddress,
      "aptSuite": formLocation.aptSuite,
      "city":formLocation.city,
      "state":formLocation.state,
      "country":formLocation.country,
      "guestCount":guestCount,
      "bedroomCount":bedroomCount,
      "bedCount":bedCount,
      "bathroomCount":bathroomCount,
      "amenities": amenities,
      "title": formDescription.title,
      "description": formDescription.description,
      "highlight": formDescription.highlight,
      "highlightDesc":formDescription.highlightDesc,
      "price": formDescription.price,
      "photos":photos
    };
    //  console.log(formData);
     try{
      const response=await API.createListing(formData);
      if(response){
           navigate("/");
      }
     }catch(err){
      console.log("Publish Listing failed", err.message);
     }
  }
  return (
    <>
      <Navbar />
      <div className='sectionAll px-5 py-8 bg-gray-300 flex flex-col'>
        <form onSubmit={handlePost}>
          <h1 className='text-blue-800 text-4xl mb-8'>Publish Your Page</h1>
          <div className='section1 bg-blue-gray-50 p-6'>
            <h2 className='text-red-800 font-semibold text-xl border-b-2 border-gray-400 pb-4'>Step 1: Tell Us about your place</h2>
            <h3 className='font-body text-xl text-blue-800 p-4 m-2'>Which of the categories best describes your place?</h3>
            <div className='flex items-start justify-center text-xl flex-wrap gap-8 px-16 '>
              {categories?.map((item, index) => (
                <div
                onClick={() => setCategory(item.label)}
                 className={`${category==item.label ?'bg-blue-600 text-white':''} hover:bg-amber-200 cursor-pointer flex flex-col items-center justify-center border border-gray-400 w-44 p-[24px] rounded-xl`}
                  key={index}>
                  <div className='icon text-4xl'>{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

          </div>
          <div className='section2 bg-blue-gray-50 p-6'>
            <h3 className='font-body text-xl text-blue-800 p-4 m-2'>What type of place will guest have?</h3>
            <div className='flex flex-col gap-4'>
              {types?.map((item, index) => (
                <div
                onClick={() => setType(item.name)}
                  className={` ${type==item.name?'bg-blue-600 text-white':''} flex justify-between border border-gray-800 p-8 rounded-xl cursor-pointer hover:bg-amber-200`}
                  key={index}>
                  <div className=''>
                    <h4 className='font-semibold'>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className='icon text-4xl'>
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='section3 bg-blue-gray-50 p-6'>
            <h3 className='font-body text-xl text-blue-800 p-4 m-2'>where is your place located?</h3>

            <div className='flex flex-col gap-4 m-12'>
              <div className='w-2/3'>
                <label htmlFor="streetAddress" className="block text-md font-semibold ">
                  Street Address
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  autoComplete="street-address"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  className="mt-1 p-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-xl"
                  placeholder="123 Main St"
                  required
                />
              </div>
              <div className='flex gap-8'>
                <div className='w-1/3'>
                  <label htmlFor="apartment" className="block text-md font-semibold  ">
                    Apartment suite if applicable
                  </label>
                  <input
                    type="text"
                    name="aptSuite"
                    value={formLocation.aptSuite}
                    onChange={handleChangeLocation}
                    id="apartment"
                    autoComplete="address-level2"
                    className="mt-1 p-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-xl"
                    placeholder="Apartment"
                    required
                  />
                </div>
                <div className='w-1/3'>
                  <label htmlFor="state" className="block text-md font-semibold ">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formLocation.city}
                    onChange={handleChangeLocation}
                    required
                    id="city"
                    autoComplete="address-level1"
                    className="mt-1 p-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-xl"
                    placeholder="CA"
                  />
                </div>
              </div>

              <div className='flex gap-8'>
                <div className='w-1/3'>
                  <label htmlFor="country" className="block text-md font-semibold ">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formLocation.state}
                    onChange={handleChangeLocation}
                    required
                    id="state"
                    autoComplete="country"
                    className="mt-1 p-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-xl"
                    placeholder="UP"
                  />
                </div>
                <div className='w-1/3'>
                  <label htmlFor="country" className="block text-md font-semibold ">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formLocation.country}
                    onChange={handleChangeLocation}
                    required
                    id="country"
                    autoComplete="country"
                    className="mt-1 p-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-xl"
                    placeholder="India"
                  />
                </div>
              </div>
            </div>
          </div>


          <div className='section4 bg-blue-gray-50 p-6'>
            <h3 className='font-body text-xl text-blue-800 p-4 m-2'>share some basics about your Place.</h3>
            <div className='flex flex-wrap gap-6 px-12'>
              <div className='flex w-52 px-4 py-6 justify-between border border-gray-400 rounded-xl'>
                <p>Guest</p>
                <div className='basic_count flex gap-1'>
                  <RemoveCircleOutline
                  onClick={() => {
                    guestCount > 1 && setGuestCount(guestCount - 1);
                  }}
                  sx={{ fontSize: '25px', cursor: 'pointer', '&:hover': { color: 'red' } }} />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                   onClick={() => {
                    setGuestCount(guestCount + 1);
                  }}
                   sx={{
                    fontSize: '25px',
                    cursor: 'pointer',
                    '&:hover': { color: 'red' }
                  }}
                  />
                </div>
              </div>
              <div className='flex w-52 px-4 py-6 justify-between border border-gray-400 rounded-xl'>
                <p>BedRooms</p>
                <div className='basic_count flex gap-1'>
                  <RemoveCircleOutline
                  onClick={() => {
                    bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                  }}
                   sx={{ fontSize: '25px', cursor: 'pointer', '&:hover': { color: 'red' } }} />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline 
                  onClick={() => {
                    setBedroomCount(bedroomCount + 1);
                  }}
                  sx={{
                    fontSize: '25px',
                    cursor: 'pointer',
                    '&:hover': { color: 'red' }
                  }}
                  />
                </div>
              </div>
             
              <div className='flex w-52 px-4 py-6 justify-between border border-gray-400 rounded-xl'>
                <p>Beds</p>
                <div className='basic_count flex gap-1'>
                  <RemoveCircleOutline 
                  onClick={() => {
                    bedCount > 1 && setBedCount(bedCount - 1);
                  }}
                  sx={{ fontSize: '25px', cursor: 'pointer', '&:hover': { color: 'red' } }} />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                  onClick={() => {
                    setBedCount(bedCount + 1);
                  }}
                   sx={{
                    fontSize: '25px',
                    cursor: 'pointer',
                    '&:hover': { color: 'red' }
                  }}
                  />
                </div>
              </div>
              <div className='flex w-52 px-4 py-6 justify-between border border-gray-400 rounded-xl'>
                <p>Bathrooms</p>
                <div className='basic_count flex gap-1'>
                  <RemoveCircleOutline 
                  onClick={() => {
                    bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                  }}
                  sx={{ fontSize: '25px', cursor: 'pointer', '&:hover': { color: 'red' } }} />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                  onClick={() => {
                    setBathroomCount(bathroomCount + 1);
                  }}
                   sx={{
                    fontSize: '25px',
                    cursor: 'pointer',
                    '&:hover': { color: 'red' }
                  }}
                  />
                </div>
              </div>

            </div>
          </div>

          <div className='section5  bg-blue-gray-50 p-6'>
            <h2 className='text-red-800 font-semibold text-xl border-b-2 border-gray-400 pb-4'>Step 2: Make your Place Stand Out</h2>
            <h3 className='font-body text-xl text-blue-800 p-4 m-2'>Tell the guest what your place has to offer.</h3>
            <div className='flex items-start justify-center text-xl flex-wrap gap-8 px-16'>
              {facilities?.map((item, index) => (
                <div 
                onClick={() => handleSelectAmenities(item.name)}
                key={index}
                className={` ${amenities.includes(item.name)? 'bg-blue-600 text-white':''} hover:bg-amber-200 cursor-pointer flex flex-col items-center justify-center border border-gray-400 w-44 p-[24px] rounded-xl`}>
                  <div className='icon text-4xl'>{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='section6  bg-blue-gray-50 p-6'>
            <h3 className='font-body text-xl text-blue-800 p-4 m-2'>Add some Photo of your Place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos e border border-gray-400 text-center px-5"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alon">
                          <div className="icon">
                            <IoIosImages className='icon text-8xl' />
                          </div>
                          <p className='text-xl'>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        <div className='flex flex-wrap items-center justify-center gap-4'>
                          {photos.map((photo, index) => {
                            return (
                              <Draggable
                                key={index}
                                draggableId={index.toString()}
                                index={index}

                              >
                                {(provided) => (
                                  <div
                                    className="photo flex flex-col items-center justify-center p-2 relative"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}

                                  >
                                    <img
                                      src={photo}
                                      alt="place"
                                      className='w-[250px] h-[200px]'
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleRemovePhoto(index)}
                                      className='text-2xl absolute top-2 right-2 text-red-800'
                                    >
                                      <BiTrash className='text-2xl' />
                                    </button>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                        </div>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon text-4xl">
                            <IoIosImages />
                          </div>
                          <p className='text-xl'>Upload from your device</p>
                        </label>

                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

          </div>
          <div className='section7 bg-blue-gray-50 p-6'>
            <h3 className='font-body text-xl text-blue-800 p-4 m-2'>What make your place attractive and exciting?</h3>
            <div className="flex flex-col gap-6 w-2/3 p-12">
              <div>
                <label htmlFor="title" className="block text-gray-700 font-semibold">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter title"
                  name="title"
                  value={formDescription.title}
                  onChange={handleChangeDescription}
                  className="w-80 input-field outline-none p-2 border border-gray-400 rounded-xl"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700 font-semibold">Description</label>
                <textarea
                  id="description"
                  placeholder="Enter description"
                  name="description"
                  rows={3}
                  cols={36}
                  value={formDescription.description}
                  onChange={handleChangeDescription}
                  className="w-80 input-field outline-none p-2 border border-gray-400 rounded-xl"
                  required
                />
              </div>
              <div>
                <label htmlFor="highlight" className="block text-gray-700 font-semibold">Highlight</label>
                <input
                  type="text"
                  id="highlight"
                  placeholder="Enter highlight"
                  name="highlight"
                  value={formDescription.highlight}

                  onChange={handleChangeDescription}
                  className="w-80 input-field outline-none p-2 border border-gray-400 rounded-xl"
                  required
                />
              </div>
              <div>
                <label htmlFor="highlightDesc" className="block text-gray-700 font-semibold">Highlight details</label>
                <textarea
                  id="highlightDesc"
                  placeholder="Enter highlight details"
                  name="highlightDesc"
                  value={formDescription.highlightDesc}
                  onChange={handleChangeDescription}
                  rows={3}
                  cols={36}
                  className="w-80 input-field outline-none p-2 border border-gray-400 rounded-xl"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700 font-semibold">Price</label>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">$</span>
                  <input
                    type="number"
                    id="price"
                    placeholder="Enter price"
                    name="price"

                    value={formDescription.price}
                    onChange={handleChangeDescription}
                    className="w-80 input-field outline-none p-2 border border-gray-400 rounded-xl"
                    required
                  />
                </div>
              </div>
            </div>

            <button className="submit_btn mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 ease-in-out" type="submit">
              CREATE YOUR LISTING
            </button>
          </div>
        </form>
      </div>
      <Footer />

    </>
  )
}

export default CreateListing
