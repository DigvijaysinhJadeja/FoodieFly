import { api } from '../../Config/api'
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDER_FAILURE, GET_USERS_ORDER_REQUEST, GET_USERS_ORDER_SUCCESS } from './ActionType3'

export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        try {
            const response = await api.post('/api/order', reqData.order, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            if(response.data.payment_url){ 
                window.location.href = response.data.payment_url; // if payment_url is present then redirect to payment page
            }
            console.log("created order Data : ", response.data);
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("Error in creating order : ", error);
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
        }
    }
}

export const getUsersOrder = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_USERS_ORDER_REQUEST});
        try {
            const response = await api.get(`/api/order/user`,{
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            
            console.log("users order : ", response.data);
            dispatch({ type: GET_USERS_ORDER_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("Error in creating order : ", error);
            dispatch({ type: GET_USERS_ORDER_FAILURE, payload: error });
        }
    }
}