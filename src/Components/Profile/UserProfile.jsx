import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';

export const UserProfile = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col items-center justify-center'>
        <AccountCircleIcon sx={{fontSize:"9rem"}}/>
        <h1 className='py-5 text-2xl font-semibold'>FoodieFLY</h1>
        <p>Email:FoodieFly123@gmail.com</p>
        <Button onCLick={handleLogout} variant='contained'  sx={{margin:"2rem 0rem"}}>
          LOGOUT
        </Button>
      </div>
    </div>
  )
}
