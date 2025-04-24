import { Avatar, Badge, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { pink } from "@mui/material/colors";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css'
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from "react-redux";

export const Navbar = () => {
    const {auth,cart} = useSelector(store=>store)
    const navigate = useNavigate()

    const handleAvatarClick = () => {
        if(auth.user?.role==="ROLE_CUSTOMER"){
            navigate("/my-profile")
        }
        else{
            navigate("/admin/restaurant")
        }
    }

    return (
        // in small screen padding will be 5 and in large screen it will be 20
        <div className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex 
        justify-between'>
                <div className='lg:mr-10 curser-pointer flex item-center space-x-4'>
                    <li onClick={()=>navigate("/")}  className='logo font-semibold text-gray-300 text-2xl cursor-pointer'>
                        FoodieFly
                    </li>
                </div>
            
            <div className='flex item-center space-x-2 lg:space-x-10'>
                
                {/* this one is for search button in the header section */}
                <div className="">
                     <IconButton sx = {{fontSize:"1.5rem"}}>
                         <SearchIcon/>   
                     </IconButton>
                </div>

                {/* this one is for account logo or list logo at the right side of the header */}
                <div className = "">
                    {auth.user ? <Avatar onClick={handleAvatarClick} sx={{bgcolor:"white",color : pink.A400}}>{auth.user.fullname[0].toUpperCase()}</Avatar> :
                        <IconButton onClick={()=>navigate("/account/login")}>
                            <PersonIcon/>
                        </IconButton>}                
                </div>

                {/*This one is for cart icon at the right side of the header with the badge content */}
                <div className="">
                     <IconButton onClick={()=>navigate("/cart")}>
                        <Badge color="primary" badgeContent = {cart.cart?.item.length}><ShoppingCartIcon sx = {{fontSize:"1.5rem"}}/>   </Badge>
                         
                     </IconButton>
                </div>
                
            </div>
        </div>
    )
}
