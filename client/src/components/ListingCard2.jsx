import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
  } from "@material-tailwind/react";
  import {useNavigate} from 'react-router-dom';
  import { facilities } from "../pages/CreateListing";
  import {useSelector,useDispatch} from 'react-redux';
import { setWishList } from "../redux/state";
import { handleWish } from "../../api/wishList";
   
  const ListingCard2=({
    listingId,
    creator,
    cloudPhotos,
    city,
    state,
    amenities,
    country,
    category,
    type,
    price,
    startDate,
    endDate,
    totalPrice,
    booking,
    highlightDesc
  })=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const user = useSelector((state) => state.user);
    const wishList = user?.wishList || [];
    const isLiked = wishList?.find((item) => item?._id === listingId);

    const patchWishList=async()=>{
      try{
        const userId=user._id;
        const response=await handleWish({userId,listingId});
        dispatch(setWishList(response));
      }catch(err){
            console.log('Failed to patch wishList',err);
      }
     }

    return (
     
      
      <Card className="h-[600px] w-[450px] shadow-lg p-2">
        <CardHeader floated={false} color="blue-gray">
          <img
            className="w-full h-[250px]"
            src={cloudPhotos[0]}
            alt="ui/ux review check"

          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          <IconButton
            size="sm"
            color="red"
            variant="text"
            className="!absolute top-4 right-4 rounded-full"
            onClick={()=>patchWishList()}
          >
            {
              isLiked ? (
                <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
              >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
               </svg>
              ):(
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill=""
                className="h-6 w-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              )
            }
          </IconButton>
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {city},{state}
            </Typography>
           
          </div>
          {!booking && (
            <>
          <Typography color="gray">
           {highlightDesc}
          </Typography>
            </>
          )}
          {
          booking && (
            <>
             <Typography color="black" className="font-semibold">
            <span className="text-gray-600">Booking from</span> {startDate}
          </Typography>
          <Typography color="black" className="font-semibold">
            <span className="text-gray-600">Booking upto</span> {endDate}
          </Typography>
          <Typography color="black" className="font-semibold">
            Total: ${totalPrice}
          </Typography>
            </>
          )
          }
         
          <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
            {amenities?.slice(0,5).map((item,index)=>(
              <Tooltip
              key={index}
               content={item}>
              <span className="flex">
                {facilities.map((fac,index)=>{
                    if(fac.name==item){
                        return ( <span
                        key={index}
                         className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            {fac.icon}
                            </span>)
                    }
                })}
              </span>
            </Tooltip>
            ))}
            
            {amenities.length>5 &&
            <Tooltip content="And +20 more">
              <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                <p>+{amenities.length-5}</p>
              </span>
            </Tooltip>
              }   
          </div>
        </CardBody>
        <CardFooter className="pt-3">
          <Button size="lg" fullWidth={true} onClick={()=>navigate(`/properties/${listingId}`)}>
            Details
          </Button>
        </CardFooter>
      </Card>
    );
  }

export default ListingCard2;