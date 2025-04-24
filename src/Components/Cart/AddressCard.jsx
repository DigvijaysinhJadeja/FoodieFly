import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card } from '@mui/material';

export const AddressCard = ({item,showButton,handleSelectAddress}) => {
    
  return (
    <Card className="flex gap-5 w-64 p-5">
        <div className="flex gap-3 items-start">
        <HomeIcon/>
        <div className='space-y-3 text-gray-500 w-[100%]'>
            <h1 className='font-semibold text-lg text-white'>Home</h1>
            <p className='break-words'>
                sector-1, Block-3, Navi Mumbai, 530068, Maharastra, India
            </p>
            {showButton && (
                <Button variant = "outlined" fullWidth onClick={()=>handleSelectAddress(item)}
                sx={{
                    border: "2px solid #E91E63",
                    color: "#E91E63",
                    backgroundColor: "transparent",
                    '&:hover': { backgroundColor: "rgba(233, 30, 99, 0.1)" },
                  }}
                >select</Button>)}
        </div>
        </div>
    </Card> 
  )
}
