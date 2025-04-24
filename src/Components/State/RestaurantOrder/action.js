import { api } from "../../Config/api"
import {
    GET_RESTAURANT_ORDERS_FAILURE,
    GET_RESTAURANT_ORDERS_REQUEST,
    GET_RESTAURANT_ORDERS_SUCCESS,
    UPDATE_ORDER_STATUS_FALIURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS
} from "./ActionType4"

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
        try {
            const response = await api.put(`api/admin/order/${orderId}/${orderStatus}`,{}, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            console.log("updated Order", response.data);
            dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("catch error:", error);
            dispatch({ type: UPDATE_ORDER_STATUS_FALIURE, payload: error });
        }
    }
}

export const fetchRestaurantOrder = ({ restaurantId, orderStatus, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_ORDERS_REQUEST });
        try {
            const response = await api.get(`api/admin/order/restaurant/${restaurantId}`, {
                param: { order_status: orderStatus },
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                },
            });
            console.log("Restaurant Order---", response.data);
            dispatch({ type: GET_RESTAURANT_ORDERS_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("catch error:", error);
            dispatch({ type: GET_RESTAURANT_ORDERS_FAILURE, payload: error });
        }
    }
}