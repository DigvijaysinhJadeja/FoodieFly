/* eslint-disable no-unused-vars */
import { Avatar, Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMenuItem, getMenuItemsByRestaurantId } from '../../Components/State/Menu/Action'

const orders = [1, 1, 1, 1, 1, 1, 1]

export default function MenuTable() {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt')
    const { restaurant, menu } = useSelector((store) => store)
    const navigate = useNavigate();
    
    useEffect(()=>{
        dispatch(getMenuItemsByRestaurantId({
            restaurantId:restaurant.usersRestaurant.id,
            jwt:jwt,
        }))
    },[])

    const handleDeleteFood=(foodId)=>{
        dispatch(deleteMenuItem({foodId,jwt})).then(() => {
            dispatch(getMenuItemsByRestaurantId({
              restaurantId: restaurant.usersRestaurant.id,
              jwt
            }))})
    }

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title={"Menu"}
                    sx={{ pt: 2, alignItems: "center" }}
                    action={
                        <IconButton
                            aria-label="settings"
                            onClick={() => navigate('/admin/restaurant/add-menu')}
                        >
                            <CreateIcon />
                        </IconButton>
                    }
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">Ingredients</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Availabilty</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menu.menuItems.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='left'>
                                        <Avatar src={item.images[0]}/>
                                    </TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">{item.ingredients.map(ing => ing.name).join(', ')}</TableCell>
                                    <TableCell align="right">₹{item.price}</TableCell>
                                    <TableCell align="right">{item.available?"✅" : "❌"}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color='primary' onClick={()=>handleDeleteFood(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Card>
        </Box>
    )
}
