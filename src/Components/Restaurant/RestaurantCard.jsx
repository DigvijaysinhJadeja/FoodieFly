import FavoriteIcon from '@mui/icons-material/Favorite';
import {Card,Chip,IconButton} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useNavigate} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../State/Authentication/Action';
import { isPresentinFavorites } from '../Config/logic';

export const RestaurantCard = ({item}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const jwt = localStorage.getItem("jwt");
    const {auth} = useSelector(store=>store)

    const handleAddtoFavorite = () => {
        dispatch(addToFavorite({jwt,restaurantId :item.id}))
    } // adding to favorite list and checking already exist or not

    const handleNavigateToRestaurant=()=>{
        if(item.open){
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`) // navigating the user to the restaurant page of the following city
        }
    }
  return (
    <Card className = 'w-[18rem]'>
        
        <div className={`${ item.open ? 'cursor-pointer' : 'cursor-not-allowed' } relative`}>
            <img className='w-full h-[10rem] rounded-t-md object-cover' 
            src={item.images[0]} alt=""/> {/* show casing the image of the restaurant from DB*/}

            {/*comes from material UI */}
            <Chip
                size="small"
                className="absolute top-2 left-2"
                color = {item.open ? "success":"error"}
                label = {item.open ? "Open":"Closed"}
                
            />
        </div>
        <div className='p-4 textPart lg:flex w-full justify-between'>
            <div className='space-y-1'>
                <p onClick={handleNavigateToRestaurant} className="font-semibold text-lg cursor-pointer">
                    {item.name} {/* the name of the restaurant from DB*/}
                </p>
                <p className='text-gray-500 text-sm'>
                    {item.description} {/* description of the provided restaurant from DB*/}
                </p>
            </div>
            <div>
                <IconButton onClick={handleAddtoFavorite}>
                    {isPresentinFavorites(auth.favorites,item) ? <FavoriteIcon /> : <FavoriteBorderIcon />} 
                </IconButton>
            </div>
        </div>
    </Card>
  )
}
