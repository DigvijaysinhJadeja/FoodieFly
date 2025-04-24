import { Button, Typography } from '@mui/material'
import { Form, Formik, Field } from 'formik'
import React from 'react'
import {TextField} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux'
import { registerUser } from '../State/Authentication/Action'

const initialValues={
  fullname:"",
  email:"",
  password:"",
  role:"ROLE_CUSTOMER"
}


export const RegisterForm = () => {

  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("form values",values)
    dispatch(registerUser({userData:values,navigate}))
  }




  return (
    
<div>
  <Typography variant="h5">
    Register
  </Typography>

    <Formik onSubmit={handleSubmit} initialValues = {initialValues}>

    <Form>

        <Field as={TextField}
            name="fullname"
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="normal"
        />
        <Field as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
        />
        <Field as={TextField}
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
        />
        <FormControl fullWidth margin="normal">
        <InputLabel id="role-simple-select-label">Role</InputLabel>
        <Field
          as = {Select}
          labelId="role-simple-select-label"
          id="role-simple-select"
          label="Role"
          name="role"
        >
          <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
          <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
        </Field>
        </FormControl>
        <Button sx={{mt:2,padding:"1rem"}} variant="contained" fullWidth type="submit">REGISTER</Button>
    </Form>  
    </Formik>

    <Typography variant='body2' align="center" sx={{mt:3}}>
        Already have an account.
    <Button size="small" onClick={()=>navigate("/account/login")}>
        LOGIN
    </Button>
    </Typography>

</div>
  )
}
