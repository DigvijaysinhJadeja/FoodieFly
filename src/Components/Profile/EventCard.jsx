import React from 'react'
import {Card,CardActions,CardContent,CardMedia, IconButton, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = (isDelete = false) => {
  return (
    <div>
        <Card sx = {{width:345}}>
            <CardMedia 
            sx = {{height:345}}
            image='https://cdn.pixabay.com/photo/2017/03/13/13/39/pancakes-2139844_1280.jpg'/>

            <CardContent>
                <Typography variant="h5" >
                    Indian Fast Food
                </Typography>
                <Typography variant="body2" >
                    50% off on your first order.
                </Typography>
                <div className='py-2 space-y-2'>
                    <p>{"mumbai"}</p>
                    <p className='text-xs text-blue-500'>April 2,2024 12:00AM</p>
                    <p className='text-xs text-red-500'>April 10,2024 12:00AM</p>
                </div>
            </CardContent>

            {isDelete && <CardActions>
                        <IconButton>
                            <DeleteIcon/>      
                        </IconButton>
                     </CardActions>}
        </Card>


    </div>
  )
}
