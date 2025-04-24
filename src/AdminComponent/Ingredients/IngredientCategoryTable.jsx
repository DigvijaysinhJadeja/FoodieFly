import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create'
import { CreateIngredientCategoryForm } from './CreateIngredientCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientCategory } from '../../Components/State/Ingredients/action';

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

export default function IngredientCategoryTable() {

    const dispatch = useDispatch();
    const {restaurant,ingredient} = useSelector((store)=>store)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const jwt = localStorage.getItem('jwt');

    useEffect(()=>{
        dispatch(getIngredientCategory({
            id:restaurant.usersRestaurant?.id,
            jwt
        }))
    },[])
        
    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title={"Ingredient Category"}
                    sx={{ pt: 2, alignItems: "center" }}
                    action={
                        <IconButton onClick={handleOpen}aria-label="settings">
                            <CreateIcon />
                        </IconButton>
                    }
                />
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Id</TableCell>
                                <TableCell >Name</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredient.category.map((item) => (
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
                    <CreateIngredientCategoryForm />
                </Box>
            </Modal>
        </Box>
    )
}
