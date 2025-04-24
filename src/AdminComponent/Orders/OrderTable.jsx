import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantOrder, updateOrderStatus } from '../../Components/State/RestaurantOrder/action';

const orderStatus = [
  {label:"Pending",value:"PENDING"},
  {label:"Completed",value:"COMPLETED"},
  {label:"Out For Delivery",value:"OUT_FOR_DELIVERY"},
  {label:"Delivered",value:"DELIVERED"},
];

export default function OrderTable() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt')
  const { restaurant, restaurantOrders } = useSelector((store) => store)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    dispatch(fetchRestaurantOrder({
      jwt,
      restaurantId: restaurant.usersRestaurant.id,

    }))
  }, [])

  const handleUpdateOrder=(orderId,orderStatus)=>{
    dispatch(updateOrderStatus({orderId,orderStatus,jwt}))
    handleClose();
  }

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          title={"All Orders"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrders.orders.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem) =>
                        <Avatar src={orderItem.food?.images[0]} />
                      )}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{item.customer?.fullname}</TableCell>
                  <TableCell align="right">₹{item.totalPrice}</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => <p>{orderItem.food?.name}</p>)}
                  </TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => orderItem.ingredients.map((ingredients) => <Chip label={ingredients} />))}
                  </TableCell>
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <div>
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      Update
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      {orderStatus.map((status)=>(<MenuItem onClick={()=>(handleUpdateOrder(item.id,status.value))}>{status.label}</MenuItem>))}
                    </Menu>
                  </div>
                </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Card>
    </Box >
  )
}
