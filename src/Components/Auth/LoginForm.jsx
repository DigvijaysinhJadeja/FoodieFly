import { Button, Typography } from '@mui/material'
import { Form, Formik, Field } from 'formik'
import React from 'react'
import {TextField} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../State/Authentication/Action'

const initialValues={
  email:"",
  password:""
}

export const LoginForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    dispatch(loginUser({userData:values,navigate}))
  }

  return (
    <div>

      <Typography variant="h5">
        Login
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues = {initialValues}>
          <Form>
              <Field as={TextField}
                  name="email"
                  label="email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
              />
              <Field as={TextField}
                  name="password"
                  label="password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  type="password"
              />
              <Button sx={{mt:2,padding:"1rem"}} variant="contained" fullWidth type="submit">Login</Button>
          </Form>  

      </Formik>

      <Typography variant='body2' align="center" sx={{mt:3}}>
        Do Not have an account?
        <Button size="small" onClick={()=>navigate("/account/register")}>
          register
        </Button>
      </Typography>
    </div>
  )
}
