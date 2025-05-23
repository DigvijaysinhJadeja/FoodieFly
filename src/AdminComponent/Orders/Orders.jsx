import React, { useState } from 'react'
import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import OrderTable from './OrderTable';


const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "All", value: "ALL" },
]
export const Orders = () => {

  const [filterValue, setfilterValue] = useState();

  const handleFilter = (event, value) => {
    setfilterValue(value)
  }

  return (
    <div className='px-2'>
      <Card className='p-5'>
        <Typography sx={{ paddingBottom: '1rem' }} variant='h5'>
          OrderStatus
        </Typography>
        <FormControl>
          <RadioGroup onChange={handleFilter}
            row name='category'
            value={filterValue || "all"}>
            {orderStatus.map((item) => (<FormControlLabel
              key={item.id}
              value={item.value}
              control={<Radio />}
              label={item.label}
              sx={{ color: 'gray' }}
            />))}
          </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable />
    </div>
  )
}
