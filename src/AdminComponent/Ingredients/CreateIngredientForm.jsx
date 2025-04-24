import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { createIngredient } from '../../Components/State/Ingredients/action';
 import { useDispatch, useSelector } from 'react-redux';

export const CreateIngredientForm = () => {

    const dispatch = useDispatch();
    const [formData, setformData] = useState({ name: "",categoryName:"",ingredientCategoryId: "" });
    const jwt = localStorage.getItem("jwt")
    const {restaurant,ingredient} = useSelector((store)=>store)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setformData({
            ...formData,
            [name]: value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            ...formData,
            name :formData.categoryName,
            restaurantId: restaurant.usersRestaurant?.id
        };
        console.log(data);
        dispatch(createIngredient({data,jwt}))
    };

    console.log(ingredient.category);
    
    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient</h1>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <TextField fullWidth
                        id="categoryName"
                        name="categoryName"
                        label="Category Name"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.categoryName}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Ingredient</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.ingredientCategoryId}
                            label="Ingredient"
                            onChange={handleInputChange}
                            name='ingredientCategoryId'
                            sx = {{mb:2}}
                        >
                            
                            {ingredient.category.map(
                                (item)=><MenuItem value={item.id}>{item.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <Button variant="contained" color="primary" type='submit'>
                        Add Ingredient
                    </Button>
                </form>

            </div>
        </div>
    )
}
