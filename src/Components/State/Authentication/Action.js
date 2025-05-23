import axios from "axios"
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { api, API_URL } from "../../Config/api"

export const registerUser = (reqData)=>{
    return async (dispatch)=>{
    dispatch({type:REGISTER_REQUEST});

    try {
        console.log("Request Data:", reqData);  // ✅ Debugging request data
        console.log("User Data Sent:", reqData.userData);
        const {data} = await axios.post(`${API_URL}/auth/signup`,reqData.userData);

        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant");
        }
        else{
            reqData.navigate("/");
        }
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt});
        console.log("registered successfully",data);

    } catch (error) {
        dispatch({type:REGISTER_FAILURE,payload:error})
        console.log("error : ",error)
    }
}
}

export const loginUser = (reqData) => async(dispatch)=>{

    dispatch({type:LOGIN_REQUEST})

    try {
        
        const {data} = await axios.post(`${API_URL}/auth/signin`,reqData.userData)

        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:LOGIN_SUCCESS,payload:data.jwt})
        console.log("successfully logged in",data)

    } catch (error) {
        dispatch({type:LOGIN_FAILURE,payload:error})
        console.log("error : ",error)
    }
}

export const getUser = (jwt) => async(dispatch)=>{

    dispatch({type:GET_USER_REQUEST})

    try {
        
        const {data} = await api.get(`/api/users/profile`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })

        
        dispatch({type:GET_USER_SUCCESS,payload:data})
        console.log("user profile",data)

    } catch (error) {
        dispatch({type:GET_USER_FAILURE,payload:error})
        console.log("error : ",error)
    }
}

export const addToFavorite = ({jwt,restaurantId}) => async(dispatch)=>{

    dispatch({type:ADD_TO_FAVORITE_REQUEST})

    try {
        
        const {data} = await api.put(`/api/restaurants/${restaurantId}/add-favorites `,{},{  // in put method we need to provide body compulsory
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })

        
        dispatch({type:ADD_TO_FAVORITE_SUCCESS,payload:data})
        console.log("Added to Favorites",data)

    } catch (error) {
        dispatch({type:ADD_TO_FAVORITE_FAILURE,payload:error})
        console.log("error : ",error)
    }
}

export const logout = () => async(dispatch)=>{

    dispatch({type:ADD_TO_FAVORITE_REQUEST})

    try {
        localStorage.clear();
        dispatch({type:LOGOUT})
        console.log("Logout successfully")

    } catch (error) {
        console.log("error : ",error)
    }
}