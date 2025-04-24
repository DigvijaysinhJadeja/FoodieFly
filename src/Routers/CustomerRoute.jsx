import React from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../Components/Home/Home'
import { RestaurantDetails } from '../Components/Restaurant/RestaurantDetails'
import { Cart } from '../Components/Cart/Cart'
import { Profile } from '../Components/Profile/Profile'
import { Auth } from '../Components/Auth/Auth'
import { PaymentSuccess } from '../Components/PaymentSuccess/PaymentSuccess'

export const CustomerRoute = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/account/:register' element={<Home/>}/>
            <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/my-profile/*' element={<Profile/>}/>
            <Route path='/payment/success/:id' element={<PaymentSuccess/>}/>

        </Routes>
        <Auth/>    
    </div>
  )
}

// url /my-profile/order
