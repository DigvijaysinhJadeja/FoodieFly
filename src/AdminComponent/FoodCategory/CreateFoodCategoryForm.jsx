/* eslint-disable no-unused-vars */
import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../Components/State/Restaurant/Action';

export const CreateFoodCategoryForm = () => {
    const {restaurant} = useSelector((store)=>store)
    const dispatch = useDispatch()

    const [FormData, setFormData] = useState({ categoryName: "", restaurantId: "" });

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
            name: FormData.categoryName,
            restaurantId: {
                id: 1
            }
        };
        dispatch(createCategoryAction({
            reqdata:data,
            jwt: localStorage.getItem("jwt")
        }));
        console.log(data);
    };

    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Category</h1>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <TextField fullWidth
                        id="categoryName"
                        name="categoryName"
                        label="Category Name"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={FormData.categoryName}
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
