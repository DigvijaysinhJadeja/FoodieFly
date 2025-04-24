import React, { useState } from 'react'
import { Accordion,AccordionDetails,AccordionSummary, MenuItem } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControlLabel,Checkbox,FormGroup } from '@mui/material';
import { Button } from '@mui/material';
import { categorizeIngredients } from '../Util/categorizeIngredient';
import { useDispatch } from 'react-redux';
import { addItemtoCart } from '../State/Cart/Action';

export const MenuCard = ({item}) => {

    const [selectedIngredients,setSelectedIngredients] = useState([]);
    const flag = true;
    const dispatch = useDispatch();

    const handleCheckBoxChange =(itemName)=>{
        console.log("value",itemName)

        if(selectedIngredients.includes(itemName)){
            setSelectedIngredients(selectedIngredients.filter((item)=>item!==itemName))
        }else {
            setSelectedIngredients([...selectedIngredients,itemName])
        }
    }
    const handleAddItemToCart=(e)=>{
        e.preventDefault()
        const reqData = {
            token:localStorage.getItem("jwt"),
            cartItem:{
                foodId:item.id,
                quantity:1,
                ingredients:selectedIngredients.map(i=>i.name),
            },
        };
        dispatch(addItemtoCart(reqData))
        console.log("req data",reqData) 
    }

    

  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
            <div className='lg:flex item-center justify-between'>
                <div className='lg:flex items-center lg:gap-5'>
                    <img className='w-[7rem] h-[7rem] object-cover' src={item.images[0]} alt=""/>
                </div>
                <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                    <p className='font-semibold text-xl px-5'>{item.name}</p>
                    <p className='px-5'>{item.price}</p>
                    <p className='px-5 text-gray-400'>{item.description}</p>
                </div>
            </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddItemToCart}>
            <div className='flex gap-5 flex-wrap'>
                {
                        Object.keys(categorizeIngredients(item.ingredients)).map((category)=>
                        <div>
                            <p>{category}</p>
                        <FormGroup>
                            {categorizeIngredients(item.ingredients)[category].map((item)=>
                            (<FormControlLabel 
                            key={item.id} 
                            control={<Checkbox onChange={()=>handleCheckBoxChange(item)}/>} 
                            label={item.name} />))}
                            
                        </FormGroup>
                        </div>
                        ) 
                }
            </div>
            <div className='pt-5'>
                <Button variant="contained" 
                sx={{ backgroundColor: "#E91E63", color: "white", "&:hover": { backgroundColor: "#C2185B" } }} 
                disabled={false} 
                type="submit">
                    {flag?"Add to Cart":"Out of Stock"}
                </Button>
            </div>
          </form>

        </AccordionDetails>
      </Accordion>
  )
}
