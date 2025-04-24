
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, Button, Chip, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import { Grid } from '@mui/material';
import { uploadImageToCloudnary } from '../Util/uploadToCloudnary';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem } from '../../Components/State/Menu/Action';
import { getIngredient } from '../../Components/State/Ingredients/action';


const initialValues = {
  name: "",
  description: "",
  price: "",
  category: '',
  restaurantId: "",
  vegetarian: true,
  seasonal: false,
  ingredients: [],
  images: [],
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const CreateMenuForm = () => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt')
  const { restaurant, ingredient } = useSelector((store) => store)
  const [uploadImage, setUploadImage] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.restaurantId = restaurant.usersRestaurant.id
      dispatch(createMenuItem({ menu: values, jwt }))
      console.log("data:", values);
    }
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudnary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  useEffect(() => {
    dispatch(getIngredient({
      id: restaurant.usersRestaurant.id,
      jwt: jwt
    }))
  }, [])

  return (
    <div className='py-10 px-5 lg:flex item-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2'>Add New Menu</h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid container spacing={2}>
            <Grid className='flex flex-wrap gap-5' item xs={12}>
              <input
                accept='image/*'
                id='fileInput'
                style={{ display: "none" }}
                onChange={handleImageChange}
                type='file'
              />

              <label className='relative' htmlFor='fileInput'>
                <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                  <AddPhotoAlternateIcon className='text-white' />
                </span>
                {
                  uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                    <CircularProgress />
                  </div>
                }
              </label>
              <div className='flex flex-wrap gap-2'>
                {
                  formik.values.images.map((image, index) => < div key={index} className='relative'>
                    <img
                      className='w-24 h-24 object-cover'
                      key={index}
                      src={image}
                      alt=''
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        outline: "none"
                      }}
                      onClick={() => handleRemoveImage(index)}>
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>)}
              </div>
            </Grid>
            {/*Name */}
            <Grid item xs={12}>
              <TextField fullWidth
                id="name"
                name="name"
                label="Name"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              >
              </TextField>
            </Grid>
            {/*Description */}
            <Grid item xs={12}>
              <TextField fullWidth
                id="description"
                name="description"
                label="Description"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              >
              </TextField>
            </Grid>
            {/*Price */}
            <Grid item xs={12} lg={6}>
              <TextField fullWidth
                id="price"
                name="price"
                label="Price"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}
              >
              </TextField>
            </Grid>
            {/*Category */}
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Food Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}
                  label="Food Category"
                  onChange={formik.handleChange}
                  name='category'
                >
                  {restaurant.categories?.map((item) => <MenuItem value={item}>{item.name}</MenuItem>)}

                </Select>
              </FormControl>
            </Grid>
            {/*Ingredients*/}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  name='ingredients'
                  multiple
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {ingredient.ingredients?.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/*Vegetarian*/}
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Vegetarian</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="Vegetarian"
                  value={formik.values.vegetarian}
                  label="IsVegetarian"
                  onChange={formik.handleChange}
                  name='vegetarian'
                >
                  <MenuItem value={true}>YES</MenuItem>
                  <MenuItem value={false}>NO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/*Seasonal*/}
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Seasonal</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="Seasonal"
                  value={formik.values.seasonal}
                  label="IsSeasonal"
                  onChange={formik.handleChange}
                  name='seasonal'
                >
                  <MenuItem value={true}>YES</MenuItem>
                  <MenuItem value={false}>NO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" type='submit'>
            Add Menu
          </Button>
        </form>
      </div>
    </div>
  )
}
