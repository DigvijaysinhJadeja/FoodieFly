import { Divider, Grid, Modal, TextField } from '@mui/material';
import React from 'react';
import { CartItem } from './CartItem';
import { AddressCard } from './AddressCard';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Card,Button } from '@mui/material';
import { Box } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/action';
// import * as Yup from 'yup';

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline:"none",
    boxShadow: 24,
    p: 4,
  };

const initialValues ={
    streetAddress:"",
    state:"",
    city:"",
    pinCode:"",
    country:"",
    }

// const validationSchema = Yup.object.shape({
//     streetAddress:Yup.string().required("Street Address is required."),
//     state:Yup.string().required("State is required."),
//     city:Yup.string().required("City is required."),
//     pinCode:Yup.required("PinCode is required."),
//     country:Yup.string().required("Country is required.")
// })

export const Cart = () => {
    const createOrderUsingSelectedAddress=()=>{}
    const handleOpenAddressModel = () => setOpen(true)
    const [open, setOpen] = React.useState(false); 
    const {cart,auth} = useSelector(store=>store);
    const dispatch = useDispatch();

    const handleClose = () => setOpen(false);
    const handleSubmit = (values) => {
        if (!cart.cart?.item || cart.cart?.item.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        const restaurantId = cart.cart?.item?.[0]?.food?.restaurant?.id;
        if (!restaurantId) {
            alert("Restaurant information is missing.");
            return;
        }
        const data = {
            jwt:localStorage.getItem("jwt"),
            order:{
                restaurantId, // 1st cart item from that food and from that restaurant and from restaurant choosing id
                
                deliveryAddress:{
                    fullName:auth.user?.fullName,
                    streetAddress:values.streetAddress,
                    City:values.city,
                    State:values.state,
                    pinCode:values.pinCode,
                    country:values.country
                }
            }
        }
        dispatch(createOrder(data));
        console.log("form value",values)
    }

  return (
    <div>
        <main className='lg:flex justify-between item-start'>
            <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                {cart.cart?.item.map ( (item) =><CartItem key={item.id} item = {item}/> )}
            <div className='w-full lg:w-[100%] px-5 mt-10'>
            <Divider/>
                <p className='font-extralight py-5'>Bill Details</p>
                <div className='space-y-3'>
                    <div className='flex justify-between text-gray-400'>
                        <p>Item Total</p>
                        <p className=''>₹{cart.cart?.total}</p>
                    </div>
                    <div className='flex justify-between text-gray-400'>
                        <p>Delivery Fee</p>
                        <p>₹21</p>
                    </div>
                    <div className='flex justify-between text-gray-400'>
                        <p>GST & Restaurant Charges</p>
                        <p>₹33</p>
                    </div>
                    <Divider/>
                    <div className='flex justify-between text-gray-400'>
                        <p>Total</p>
                        <p>₹{cart.cart?.total+21+33}</p>
                    </div>
                </div>
            </div>
            </section>
            <Divider orientation='vertical' flexItem/>
            <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                <div>
                    <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
                    <div className='flex gap-5  flex-wrap justify-center'>
                        {[1,1,1,1,1].map((item,index)=><AddressCard  handleSelectAddress={createOrderUsingSelectedAddress} key={index} item = {item} showButton={true}/>)}
                        <Card className="flex gap-5 w-64 p-5">
                            <div className="flex gap-3 items-start">
                                <AddLocationAltIcon/>
                                <div className='space-y-3 text-gray-500 w-[100%]'>
                                    <h1 className='font-semibold text-lg text-white'>Add New Address</h1>
                                        <Button variant = "contained" fullWidth onClick={handleOpenAddressModel}
                                            sx={{ backgroundColor: "#E91E63", color: "white", "&:hover": {backgroundColor: "#C2185B" }}} 
                                        >Add</Button>
                                </div>
                                </div>
                            </Card> 
                    </div>
                </div>
            </section>
        </main>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Formik 
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                    <Form>
                    <Grid container spacing={2}>
                         <Grid item xs={12}>
                            <Field 
                            as={TextField}
                            name="streetAddress"
                            label="Street Address"
                            fullWidth
                            variant="outlined"
                            // error={!ErrorMessage("streetAddress")}
                            // helperText={
                            //     <ErrorMessage>
                            //         {(msg)=><span className='text-red-600'>{msg}</span>}
                            //     </ErrorMessage>
                            // }
                            />
                            
                         </Grid>
                         <Grid item xs={12}>
                            <Field 
                            as={TextField}
                            name="state"
                            label="State"
                            fullWidth
                            variant="outlined"
                            // error={!ErrorMessage("streetAddress")}
                            // helperText={
                            //     <ErrorMessage>
                            //         {(msg)=><span className='text-red-600'>{msg}</span>}
                            //     </ErrorMessage>
                            // }
                            />
                            
                         </Grid>
                         <Grid item xs={12}>
                            <Field 
                            as={TextField}
                            name="city"
                            label="City"
                            fullWidth
                            variant="outlined"
                            // error={!ErrorMessage("streetAddress")}
                            // helperText={
                            //     <ErrorMessage>
                            //         {(msg)=><span className='text-red-600'>{msg}</span>}
                            //     </ErrorMessage>
                            // }
                            />
                            
                         </Grid>
                         <Grid item xs={12}>
                            <Field 
                            as={TextField}
                            name="pinCode"
                            label="PinCode"
                            fullWidth
                            variant="outlined"
                            // error={!ErrorMessage("streetAddress")}
                            // helperText={
                            //     <ErrorMessage>
                            //         {(msg)=><span className='text-red-600'>{msg}</span>}
                            //     </ErrorMessage>
                            // }
                            />
                            
                         </Grid>
                         <Grid item xs={12}>
                            <Field 
                            as={TextField}
                            name="country"
                            label="Country"
                            fullWidth
                            variant="outlined"
                            // error={!ErrorMessage("streetAddress")}
                            // helperText={
                            //     <ErrorMessage>
                            //         {(msg)=><span className='text-red-600'>{msg}</span>}
                            //     </ErrorMessage>
                            // }
                            />
                            
                         </Grid>
                         <Grid item xs={12}>
                             <Button variant='contained' fullWidth type='submit' color='primary'>Deliver Here </Button>
                         </Grid>
                    </Grid>
                    </Form>
                </Formik>
            </Box>
        </Modal>
    </div>
  )
}
