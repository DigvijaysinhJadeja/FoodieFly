      /* eslint-disable no-unused-vars */
      import React, { useEffect, useState } from 'react'
      import { Divider, FormControl, FormControlLabel, Grid, RadioGroup, Typography } from '@mui/material';
      import LocationOnIcon from '@mui/icons-material/LocationOn';
      import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
      import {Radio} from '@mui/material';
      import { MenuCard } from './MenuCard';
      import { useNavigate, useParams} from 'react-router';
      import { useDispatch, useSelector } from 'react-redux';
      import { getRestaurantById, getRestaurantCategory } from '../State/Restaurant/Action';
      import { getMenuItemsByRestaurantId } from '../State/Menu/Action';


      const FoodTypes = [
        {label:"All" , value:'all'},
        {label:"Vegetarian only" , value:'vegetarian'},
        {label:"Non-Vegetarian" , value:'non_vegetarian'},
        {label:"Seasonal" , value:'seasonal'},  
      ]


      const menu = [1,1,1,1,1,1,1,1,1]


      export const RestaurantDetails = () => {

        const navigate = useNavigate();
        const dispatch = useDispatch(); 
        const jwt = localStorage.getItem("jwt");
        const {auth,restaurant,menu} = useSelector(store=>store);
        const [selectedCategory,setSelectedCategory] = useState("");

        const {id} = useParams() // accessing the customer 

        const [foodType,setFoodType] = React.useState("all");
        const handleFilter =(e)=>{
          setFoodType(e.target.value)
          console.log(e.target.value,e.target.name)
        } 
        const handleFilterCategory =(e,value)=>{
          setSelectedCategory(value);
          console.log(e.target.value,e.target.name,value);
        }

        const filteredItems = menu.menuItems

        console.log("restaurant:",restaurant);

        useEffect(()=>{
          dispatch(getRestaurantById({jwt,restaurantId:id}))
          dispatch(getRestaurantCategory({jwt,restaurantId:id}))
          
      },[dispatch,id,jwt]);

        useEffect(()=>{
          dispatch(
            getMenuItemsByRestaurantId({
              jwt,restaurantId:id,
              vegetarian:foodType==="vegetarian",
              nonveg:foodType==="non_vegetarian",
              seasonal:foodType==="seasonal",
              foodCategory:selectedCategory
            })
          ); 
        },[selectedCategory,foodType,dispatch,id,jwt])

        return (
          <div className='px-5 lg:px-20'>

              <section>
                <h3 className='text-gray-500 py-2 mt-10'>
                  Home/india/indian Fast Food/3
                </h3>
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <img className = "w-full h-[40vh] object-cover"src={restaurant.restaurant?.images[1]}
                        alt =""/>
                    </Grid>
                    <Grid item xs={12} lg = {6}>
                        <img className = "w-full h-[40vh] object-cover"src={restaurant.restaurant?.images[0]}  
                        alt =""/>
                    </Grid>
                    <Grid item xs={12} lg = {6}>
                        <img className = "w-full h-[40vh] object-cover"src={restaurant.restaurant?.images[2]}  
                        alt =""/>
                    </Grid>
                  </Grid>
                </div>

                <div className='pt-3 pb-5'>
                  <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                  <p className='text-gray-500 flex item-center space-y-2 mt-1'>
                    {restaurant.restaurant?.description}
                  </p>
                  <div className='space-y-3 mt-3'>
                  <p className='text-gray-500 flex item-center gap-3'>
                  <LocationOnIcon/> 
                    <span>
                      {restaurant.restaurant?.owner?.address}
                    </span>
                  </p>
                  </div>

                  <p className='text-gray-500 flex item-center gap-3 mt-1'>
                    <CalendarTodayIcon/> 
                    <span>
                      {restaurant.restaurant?.openingHours}
                    </span>
                  </p>


                </div>
              </section>
            <Divider/>

            <section className='pt-[1rem] lg:flex relative'>
              {/* filter */}
              <div className='space-y-10 lg:w-[20%] filter '>

                <div className='box space-y-5 lg:sticky top-28 p-5 shadow-md'>

                  {/* food type */}
                  <div>

                    <Typography variant='h5' sx={{paddingBottom:'1rem'}}>
                        Food Type
                    </Typography>

                    <FormControl className='py-10 space-y-5' component={"fieldset"}>
                        <RadioGroup onChange={handleFilter}  name = "food_type" value ={foodType}>
                          {FoodTypes.map((item)=>(
                            <FormControlLabel 
                            key = {item.id}
                            value={item.value} 
                            control={<Radio/>} 
                            label={item.label}/>
                            ))}
                        </RadioGroup>
                    </FormControl>

                  </div>

                  <Divider/>
                  
                  {/* food Category */}
                  <div className='pt-[2rem] '>
                    <Typography variant='h5' sx={{paddingBottom:'1rem'}}>
                        Food Category
                    </Typography>
                    <FormControl className='py-10 space-y-5' component={"fieldset"}>
                      <RadioGroup 
                        onChange={handleFilterCategory}
                        name = "food_category" 
                        value ={selectedCategory}
                        >
                        {restaurant.categories.map((item)=>(
                        <FormControlLabel
                        key = {item.id}
                        value={item.name} 
                        control={<Radio/>} 
                        label={item.name}/>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                {filteredItems.map((item)=>(<MenuCard key={item.id} item={item}/>))}
              </div>

            </section>
          </div>
        )
      }
