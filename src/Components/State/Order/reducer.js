import * as actionTypes from './ActionType3';

const initialState = {
    loading:false,
    orders:[],
    error:null,
}

export const orderReducer = (state=initialState,{type,payload}) => {
    switch(type){
        case actionTypes.GET_USERS_ORDER_REQUEST:
            return {
                ...state,
                error:null,
                loading:true
            };
        case actionTypes.GET_USERS_ORDER_SUCCESS:
            return {
                ...state,
                error:null,
                loading:false,
                orders:payload
            }

        case actionTypes.GET_USERS_ORDER_FAILURE:
            return {
                ...state,
                error:payload,
                loading :false
            }
            
        default:
            return state;
    }
};
