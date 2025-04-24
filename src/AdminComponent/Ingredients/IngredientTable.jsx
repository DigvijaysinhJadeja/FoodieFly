import { Box, Button, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create'
import { CreateIngredientForm } from './CreateIngredientForm';
import { getIngredient, updateStock } from '../../Components/State/Ingredients/action';
import { useDispatch, useSelector } from 'react-redux';

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

export default function IngredientTable() {

    const dispatch = useDispatch();
    const {restaurant,ingredient} = useSelector((store)=>store);
    const jwt = localStorage.getItem('jwt');

    const [open,setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(()=>{
            dispatch(getIngredient({
                id:restaurant.usersRestaurant.id,
                jwt:jwt
            }))
        },[])
    

    const handleUpdateStock=( id  )=>{
            dispatch(updateStock(
                {
                    id:id,
                    jwt:jwt
                }))
        }

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title={"Ingredients"}
                    sx={{ pt: 2, alignItems: "center" }}
                    action={
                        <IconButton onClick={handleOpen} aria-label="settings">
                          <CreateIcon/>
                        </IconButton>
                      }
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Id</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell >Category</TableCell>
                                <TableCell >Availabilty</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredient.ingredients.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell >{item.id}</TableCell>
                                    <TableCell >{item.name}</TableCell>
                                    <TableCell >{item.category.name}</TableCell>
                                    <TableCell >
                                        <Button onClick={()=>handleUpdateStock(item.id)}>{item.inStock?"IN_STOCK":"OUT_OF_STOCK"}</Button>
                                    </TableCell>
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
                    <CreateIngredientForm/>
                </Box>
            </Modal>
        </Box>
    )
}
