/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import './Home.css';
import { MultiItemCarousel } from "./MultiItemCarousel";
import { IconButton } from "@mui/material";
import { RestaurantCard } from "../Restaurant/RestaurantCard";
import { getAllRestaurantAction } from "../State/Restaurant/Action";
import { useDispatch, useSelector } from "react-redux";
const Restaurants = [1,1,1,1,1,1,1,1,1,1,1,1,1]

export const Home = () => {
    const dispatch=useDispatch() // sending action to redux store which should be performed
    const jwt = localStorage.getItem('jwt') // accessing the localstorage using the key 'jwt'
    const {restaurant} = useSelector(store=>store) // accessing all restaurnats from local storage

    console.log("restaurant ",restaurant )
    useEffect(()=>{
    dispatch(getAllRestaurantAction(jwt)) // accessing all restaurants from the backend
    },[]) 

    
    return (
        <div className="pb-10">
            {/* Banner Section */}
            <section className="banner -z-50 relative flex flex-col justify-center items-center">
                <div className="w-[50vw] z-10 text-center"> 
                    <p className="text-2xl lg:text-6xl font-Bold z-10 py-5 text-red-600">FoodieFly</p>
                    <p className="z-10 text-black text-xl lg:text-4xl">Savor the Speed, Taste the Delight! </p>
                </div>
                <div className="cover absolute top-0 left-0 right-0">

                </div>
                <div className="">

                </div>
            </section>

            {/* Slider Section*/}
            <section className="p-10 lg:py-10 lg:px-20">
                <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">Top Meals</p>
                <MultiItemCarousel/> 
            </section>

            {/*Restaurant Card Section */}
            <section className="px-5 lg:px-20 pt-10">
                <h1 className="text-2xl font-semibold text-gray-400 pb-8">Order From Our Handpicked Favorites</h1>
                <div className="flex flex-wrap items-center justify-around gap-5">
                    {
                        restaurant.restaurants.map((item)=><RestaurantCard item={item}/>) 
                    }
                </div>
            </section>
            
        </div>
    )
}
