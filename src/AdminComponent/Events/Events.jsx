/* eslint-disable no-unused-vars */
  import React, { useEffect, useState } from 'react';
  import { Box, Button, CircularProgress, Grid, Modal, TextField } from '@mui/material';
  import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import dayjs from 'dayjs';
  import { useDispatch, useSelector } from 'react-redux';
  import { createEventAction, deleteEventAction, getRestaurantEvents } from '../../Components/State/Restaurant/Action';
import { EventTable } from './EventTable';

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



  export const Events = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt')
    const { restaurant } = useSelector((store) => store)

    const initialValues = {
      image:'',
      location:'',
      name:'',
      startedAt: dayjs(),
      endsAt: dayjs(),
  }

    const [formValues, setFormValues] = useState(initialValues);
    const [events, setEvents] = useState(formValues);

    const handleSubmit = (e) => {
      e.preventDefault();

      const data = {
        ...formValues,
        startedAt: formValues.startedAt.format('MMMM DD, YYYY hh:mm A'),
        endsAt: formValues.endsAt.format('MMMM DD, YYYY hh:mm A'),
      };
      console.log(data);
      dispatch(createEventAction({
        data:formValues,
        jwt:jwt,
        restaurantId:restaurant.usersRestaurant.id
      }))
      console.log("eventObject")
      setFormValues(initialValues);
    };

    const handleFormChange = (e) => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    };

    const handleDateChange = (date, dateType) => {
      setFormValues({
        ...formValues,
        [dateType]: date,
      });
    };



    useEffect(() => {
        dispatch(getRestaurantEvents({ 
          restaurantId : restaurant.usersRestaurant.id,
          jwt:jwt
          }));
      
    }, []);

    const handleDelete = (eventId) => {
      dispatch(deleteEventAction({eventId,jwt}))
    };

    return (
      <div className="p-5">
        <Button onClick={handleOpen} variant="contained">
          Create New Event
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Image URL */}
                <Grid item xs={12}>
                  <TextField
                    name="image"
                    label="Image Url"
                    variant="outlined"
                    fullWidth
                    value={formValues.image}
                    onChange={handleFormChange}
                  />
                </Grid>

                {/* Location */}
                <Grid item xs={12}>
                  <TextField
                    name="location"
                    label="Location"
                    variant="outlined"
                    fullWidth
                    value={formValues.location}
                    onChange={handleFormChange}
                  />
                </Grid>

                {/* Event Name */}
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Event Name"
                    variant="outlined"
                    fullWidth
                    value={formValues.name}
                    onChange={handleFormChange}
                  />
                </Grid>

                {/* Start Date & Time */}
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Start Date & Time"
                      value={formValues.startedAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, 'startedAt')
                      }
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Grid>

                {/* End Date & Time */}
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="End Date & Time"
                      value={formValues.endsAt}
                      onChange={(newValue) => handleDateChange(newValue, 'endsAt')}
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
        {/* Display fetched events */}
      <div>
        {restaurant.restaurantEvents.map((event) => (
          <EventTable
            key={event.id}
            event={event}
            isDelete={true}
            onDelete={handleDelete}
          />
        ))}
      </div>
        </div> 
        
  );
};
