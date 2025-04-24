import { isPresentinFavorites } from "../../Config/logic";
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const intialState = {

    user :null,
    isloading:false,
    error:null,
    jwt:null,
    favorites:[],
    success:null

} // intial state is just a variable name , it can be anything you want but the name defined here and the name used in the reducer should be same
export const authReducer =  (state = intialState,action) => {

    switch(action.type){
        case REGISTER_REQUEST:      
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
            return {
                ...state,
                isloading:true,
                error:null,
                success:null
            };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isloading:false,
                jwt:action.payload,
                success:"register success"
            }; // is loading is false as the data recieved from the API successfully
        
        case GET_USER_SUCCESS:
            return {
                ...state,
                isloading:false,
                user:action.payload,
                favorites:action.payload.favorites
                };

        case ADD_TO_FAVORITE_SUCCESS:
            return {
                ...state,
                isloading:false,
                error:null,
                favorites:isPresentinFavorites(state.favorites,action.payload) ? 
                state.favorites.filter((item)=>item.id!==action.payload) : // filter item from favorite list 
                [action.payload,...state.favorites] // add item to favorite list
                // logic will be used same as in backend and will to also be implemented in frontend
            };
        
        case LOGOUT:
            return intialState;
                
        case REGISTER_FAILURE:      
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
            return {
                ...state,
                isloading:false,
                error:action.payload,
                success:null
            };
        default:
            return state;
    }

}