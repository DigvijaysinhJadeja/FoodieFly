
import { GET_RESTAURANT_ORDERS_FAILURE, GET_RESTAURANT_ORDERS_REQUEST, GET_RESTAURANT_ORDERS_SUCCESS, UPDATE_ORDER_STATUS_FALIURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType4"

const initialState = {
    loading:false,
    error:null, 
    orders:[],
};

export const restarantOrderReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_RESTAURANT_ORDERS_REQUEST:
        case UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading:true,
                error:null
            };

        case GET_RESTAURANT_ORDERS_SUCCESS:
            return {
                ...state,
                loading:false,
                orders:action.payload  
            };

        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading:false,
                orders:state.orders.map(
                    order => order.id === action.payload.id ? action.payload : order
                )
            };

        case GET_RESTAURANT_ORDERS_FAILURE:
        case UPDATE_ORDER_STATUS_FALIURE:
            return {
                ...state,
                loading:false,
                error:action.error
            }
        
        default : 
            return state;
    }
}