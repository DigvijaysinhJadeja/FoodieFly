/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { AdminSideBar } from './AdminSideBar';
import { Route, Routes } from 'react-router-dom';
import { RestaurantDashboard } from '../Dashboard/RestaurantDashboard';
import { Orders } from '../Orders/Orders';
import { Menu } from '../Menu/Menu';
import { FoodCategory } from '../FoodCategory/FoodCategory';
import { Ingredients } from '../Ingredients/Ingredients';
import { Events } from '../Events/Events';
import { RestaurantDetails } from './RestaurantDetails';
import { CreateMenuForm } from '../Menu/CreateMenuForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantCategory } from '../../Components/State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../../Components/State/Menu/Action';
import { getUsersOrder } from '../../Components/State/Order/action';
import { fetchRestaurantOrder } from '../../Components/State/RestaurantOrder/action';

export const Admin = () => {

  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const {restaurant} = useSelector((store)=>store)

  const handleClose=()=>{
    
  };

  useEffect(()=>{
      
    dispatch(getRestaurantCategory({
      jwt,
      restaurantId:restaurant.usersRestaurant?.id
    }));
    dispatch(fetchRestaurantOrder(
      {
        jwt,
        restaurantId: restaurant.usersRestaurant?.id
      }
    ));
    //dispatch(getMenuItemsByRestaurantId());
    //dispatch(getRestaurantById());

  },[])

  return (
    <div className='lg:flex justify-between'>
        <div>
            <AdminSideBar handleClose={handleClose}/>
        </div>
        <div className='w-[80%]'>
          <Routes>
              <Route path='/' element={<RestaurantDashboard/>}/>
              <Route path='/order' element={<Orders/>}/>
              <Route path='/menu' element={<Menu/>}/>
              <Route path='/add-menu' element={<CreateMenuForm/>}/>
              <Route path='/category' element={<FoodCategory/>}/>
              <Route path='/ingredients' element={<Ingredients/>}/>
              <Route path='/event' element={<Events/>}/>  
              <Route path='/details' element={<RestaurantDetails/>}/>
          </Routes>
        </div>
    </div>
  )
}
