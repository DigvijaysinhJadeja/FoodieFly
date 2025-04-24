
import { CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import { Navbar } from './Components/Navbar/Navbar'
import { Home } from './Components/Home/Home'
import { darkTheme } from './Theme/DarkTheme'
import { RestaurantDetails } from './Components/Restaurant/RestaurantDetails'
import { Cart } from './Components/Cart/Cart'
import { Profile } from './Components/Profile/Profile'
import { CustomerRoute } from './Routers/CustomerRoute'
import { Auth } from './Components/Auth/Auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './Components/State/Authentication/Action'
import { findCart } from './Components/State/Cart/Action'
import { Routers } from './Routers/Routers'
import { getAllRestaurantByUserId } from './Components/State/Restaurant/Action'

function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector(store => store)
  // if you want to get the whole store else if you need a part of store then just write store.auth (for authentication ) or store.cart (for cart)
  //get user profile is to be dispatched whenever our application renders first time
  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt))
  }, [auth.jwt])

  //if already found then relocate to admin panel else go to create new restaurant form by performing below action and admin route 
  useEffect(()=>{
    dispatch(getAllRestaurantByUserId(auth.jwt||jwt)); // (redux store jwt || localStorage Jwt()
  },[auth.user])

      

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
      <Auth />
    </ThemeProvider>
  )
}

export default App;
