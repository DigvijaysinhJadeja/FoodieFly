/* eslint-disable no-unused-vars */
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import React, { useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import {useDispatch, useSelector} from 'react-redux'
import { updateRestaurantStatus } from '../../Components/State/Restaurant/Action';

export const RestaurantDetails = () => {
  const {restaurant} = useSelector((store)=>store)
  const dispatch = useDispatch();

  console.log("Restaurant Details:",restaurant)
  
  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({
      restaurantId:restaurant.usersRestaurant.id,
      jwt:localStorage.getItem("jwt")
    }))
  };

  return (
    <div className="lg:px-20 px-5 pb-10">
      {/* Header Section */}
      <div className="py-5 flex justify-center items-center gap-5 flex-wrap">
        <h1 className="text-2xl lg:text-6xl text-center font-bold p-5">{restaurant.usersRestaurant?.name}</h1>
        <Button
          color={!restaurant.usersRestaurant?.open ? 'primary' : 'error'}
          className="px-6 py-3"
          variant="contained"
          onClick={handleRestaurantStatus}
          size="large"
        >
          {restaurant.usersRestaurant?.open ? 'Close' : 'Open'}
        </Button>
      </div>

      <Grid container spacing={2}>
        
      {/* 1st Card */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300 text-xl">Restaurant</span>}
            />
            <CardContent className="text-gray-200 space-y-6">
              {[
                ['Owner', restaurant.usersRestaurant?.owner.fullname],
                ['Restaurant Name', restaurant.usersRestaurant?.name],
                ['Cuisine Type', restaurant.usersRestaurant?.cuisineType],
                ['Opening Hours', restaurant.usersRestaurant?.openingHours],
              ].map(([label, value]) => (
                <div className="flex" key={label}>
                  <p className="w-48 font-medium">{label}</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {value}
                  </p>
                </div>
              ))}

              <div className="flex items-center">
                <p className="w-48 font-medium">Status</p>
                <p className="text-gray-400">
                  <span className="pr-5">-</span>
                  <span
                    className={`px-5 py-2 rounded-full ${restaurant.usersRestaurant?.open ? 'bg-green-400' : 'bg-red-400'
                      } text-gray-950`}
                  >
                    {restaurant.usersRestaurant?.open ? 'Open' : 'Closed'}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </Grid>
        
      {/* 2nd Card */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300 text-xl">Address</span>}
            />
            <CardContent className="text-gray-200 space-y-6">
              {[
                ['Country', 'India'],
                ['City', 'Banglore'],
                ['Postal Code', '361142'],
                ['Street Address', 'sector-6'],
              ].map(([label, value]) => (
                <div className="flex" key={label}>
                  <p className="w-48 font-medium">{label}</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {value}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
      {/* 3rd Card */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300 text-xl">Contact</span>}
            />
            <CardContent className="text-gray-200 space-y-6">
              {[
                ['Email', restaurant.usersRestaurant?.contactInformation?.email],
                ['Mobile', restaurant.usersRestaurant?.contactInformation?.mobile],
              ].map(([label, value]) => (
                <div className="flex" key={label}>
                  <p className="w-48 font-medium">{label}</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {value}
                  </p>
                </div>
              ))}

              <div className="flex items-center">
                <p className="w-48 font-medium">Social Media</p>
                <div className="flex gap-4 items-center">
                <span className="pr-5">-</span>
                  <span className="text-gray-400 text-3xl flex items-center gap-4">
                    <a href={restaurant.usersRestaurant?.contactInformation?.instagram}>
                    <InstagramIcon fontSize="inherit" />
                    </a>
                    <a href={restaurant.usersRestaurant?.contactInformation?.twitter}>
                    <XIcon fontSize="inherit" />
                    </a>
                    <LinkedInIcon fontSize="inherit" />
                    <FacebookIcon fontSize="inherit" />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
