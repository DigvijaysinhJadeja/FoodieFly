
import React, { useState } from 'react'
import { useFormik } from 'formik'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button, CircularProgress, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import { Grid } from '@mui/material';
import { uploadImageToCloudnary } from '../Util/uploadToCloudnary';
import { useDispatch } from 'react-redux';
import { createRestaurant } from '../../Components/State/Restaurant/Action';


const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  pinCode: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  openingHours: "Mon-Sun : 9:00 Am - 12:00 Pm",
  images: []
}

export const CreateRestaurantForm = () => {

  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.stateProvince,
          pinCode: values.pinCode,
          country: values.country
        },
        contactInformation: {
        email: values.email,
        mobile: values.mobile,
        twitter: values.twitter,
        instagram: values.instagram
      },
        openingHours: values.openingHours,
        images: values.images
      }
      console.log("data:",data);

      dispatch(createRestaurant({data,token:jwt}))
    }
  });



  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudnary(file);
    formik.setFieldValue("images",[...formik.values.images,image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index,1);
    formik.setFieldValue("images",updatedImages);
  };

  return (
    <div className='py-10 px-5 lg:flex item-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2'>Add New Restaurant</h1>
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
            {/*Cuisine Type */}
            <Grid item xs={12} lg={6}>
              <TextField fullWidth
                id="cuisineType"
                name="cuisineType"
                label="Cuisine Type"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
              >
              </TextField>
            </Grid>
            {/*Opening Hours */}
            <Grid item xs={12} lg={6}>
              <TextField fullWidth
                id="openingHours"
                name="openingHours"
                label="Opening Hours"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              >
              </TextField>
            </Grid>
            {/*Street Address */}
            <Grid item xs={12}>
              <TextField fullWidth
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
              >
              </TextField>
            </Grid>
            {/*city*/}
            <Grid item xs={12} lg={4}>
              <TextField fullWidth
                id="city"
                name="city"
                label="City"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
              >
              </TextField>
            </Grid>
            {/*State Province*/}
            <Grid item xs={12} lg={4}>
              <TextField fullWidth
                id="stateProvince"
                name="stateProvince"
                label="State/Province"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.stateProvince}
              >
              </TextField>
            </Grid>
            {/*Pin Code*/}
            <Grid item xs={12} lg={4}>
              <TextField fullWidth
                id="pinCode"
                name="pinCode"
                label="Pin Code"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.pinCode}
              >
              </TextField>
            </Grid>
            {/*country*/}
            <Grid item xs={12}>
              <TextField fullWidth
                id="country"
                name="country"
                label="Country"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
              >
              </TextField>
            </Grid>
            {/*email*/}
            <Grid item xs={12} lg={6}>
              <TextField fullWidth
                id="email"
                name="email"
                label="Email"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
              >
              </TextField>
            </Grid>
            {/*mobile*/}
            <Grid item xs={12} lg={6}>
              <TextField fullWidth
                id="mobile"
                name="mobile"
                label="Mobile number"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              >
              </TextField>
            </Grid>
            {/*instagram*/}
            <Grid item xs={12} lg={6}>
              <TextField fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              >
              </TextField>
            </Grid>
            {/*twitter*/}
            <Grid item xs={12} lg={6}>
              <TextField fullWidth
                id="twitter"
                name="twitter"
                label="Twitter"
                varient="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              >
              </TextField>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" type='submit'>
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>
  )
}
