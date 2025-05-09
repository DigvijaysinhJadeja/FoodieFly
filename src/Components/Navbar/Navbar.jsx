import { Avatar, Badge, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
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
    <div className="navbar">
        {/* Logo Section */}
        <div onClick={() => navigate("/")} className="logo">
            <span className="logo-icon">🍴</span> 
            <span className="logo-text">FoodieFly</span>
        </div>

        {/* Navigation Icons */}
        <div className="nav-icons">
            {/* Search Icon */}
            <IconButton className="icon-btn">
                <SearchIcon />
            </IconButton>

            {/* Account Icon */}
            {auth.user ? (
                <Avatar
                    onClick={handleAvatarClick}
                    className="avatar"
                >
                    {auth.user.fullname[0].toUpperCase()}
                </Avatar>
            ) : (
                <IconButton onClick={() => navigate("/account/login")} className="icon-btn">
                    <PersonIcon />
                </IconButton>
            )}

            {/* Cart Icon */}
            <IconButton onClick={() => navigate("/cart")} className="icon-btn">
                <Badge color="secondary" badgeContent={cart.cart?.item.length}>
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        </div>
    </div>
);
}
