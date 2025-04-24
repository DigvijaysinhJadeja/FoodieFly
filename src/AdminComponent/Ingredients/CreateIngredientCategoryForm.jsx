import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Ingredients } from './Ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientCategory } from '../../Components/State/Ingredients/action';

export const CreateIngredientCategoryForm = () => {

    const dispatch = useDispatch()
    const [FormData, setFormData] = useState({ IngredientsCategory: "" });
    const jwt = localStorage.getItem("jwt")
    const {restaurant} = useSelector((store)=>store);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...FormData,
            [name]: value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name:FormData.IngredientsCategory,
            restaurantId:restaurant.usersRestaurant?.id
        }
        console.log(FormData);
        dispatch(createIngredientCategory({data,jwt}))
    };

    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient Category</h1>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <TextField fullWidth
                        id="IngredientsCategory"
                        name="IngredientsCategory"
                        label="Ingredient Category"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={FormData.IngredientsCategory}
                        sx={{ mb: 2 }}
                    />  
                    <Button variant="contained" color="primary" type='submit'>
                        Add Category
                    </Button>
                </form>
                
            </div>
        </div>
    )
}
