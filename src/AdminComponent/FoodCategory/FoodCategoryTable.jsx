/* eslint-disable no-unused-vars */
import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create'
import { CreateFoodCategoryForm } from './CreateFoodCategoryForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantCategory } from '../../Components/State/Restaurant/Action'
import { fetchRestaurantOrder } from '../../Components/State/RestaurantOrder/action'

const orders = [1, 1, 1, 1, 1, 1, 1]
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
  

export default function FoodCategoryTable(){

    const {restaurant} = useSelector((store)=>store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // console.log("Restaurant Details:",restaurant)

      useEffect(()=>{
        dispatch(getRestaurantCategory({
          jwt,
          restaurantId:restaurant.usersRestaurant?.id
        }));
      },[])

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title={"Food Category"}
                    sx={{ pt: 2, alignItems: "center" }}
                    action={
                        <IconButton onClick={handleOpen} aria-label="settings">
                            <CreateIcon />
                        </IconButton>
                    }
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Id</TableCell>
                                <TableCell >Name</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurant.categories.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell >{item.id}</TableCell>
                                    <TableCell >{item.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateFoodCategoryForm/>
                </Box>
            </Modal>
        </Box>
    )
}
