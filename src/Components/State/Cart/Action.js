import { api } from "../../Config/api"
import {
    ADD_ITEM_TO_CART_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    CLEAR_CART_FAILURE,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    FIND_CART_FAILURE,
    FIND_CART_REQUEST,
    FIND_CART_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE,
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    REMOVE_CARTITEM_FAILURE,
    REMOVE_CARTITEM_REQUEST,
    REMOVE_CARTITEM_SUCCESS,
    UPDATE_CARTITEM_FAILURE,
    UPDATE_CARTITEM_REQUEST,
    UPDATE_CARTITEM_SUCCESS
} from "./ActionType2"

export const findCart = (token) => {
    return async (dispatch) => {
        dispatch({ type: FIND_CART_REQUEST });
        try {
            const response = await api.get(`/api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('found the cart:', response.data)
            dispatch({ type: FIND_CART_SUCCESS, payload: response.data });     
        } catch (error) {
            dispatch({ type: FIND_CART_FAILURE, payload: error });
            console.log('error:', error)
        }
    }
}

export const getAllCartItems = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
        try {
            const response = await api.get(`/api/cart/${reqData.cartId}/items`, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
            console.log('Getting All Cart Items:', response.data);
        } catch (error) {
            dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
            console.log("error:", error);
        }

    }
}

export const addItemtoCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
        try {
            console.log('Request Payload:', reqData.cartItem);
            const response = await api.put(`api/cart/add`, reqData.cartItem, {
                headers: {
                    Authorization:`Bearer ${reqData.token}`,
                },
            });
            dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: response.data});
            console.log('Added item to cart successfully are:', response.data);
        } catch (error) {
            console.log("error:", error);
            dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error });
        }
    }
}

export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CARTITEM_REQUEST });
        try {
            console.log(reqData.token)
            const response = await api.put(`api/cart-item/update`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            });
            dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: response.data });
            console.log('Updated item in cart successfully are:', response.data);
        } catch (error) {
            console.log("error:", error);
            dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error })
        }
    }

}

export const removeCartItem = ({ cartItemId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_CARTITEM_REQUEST });
        try {
            const response = await api.delete(`api/cart-item/${cartItemId}/remove`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
            console.log('Removed item from cart successfully are:', response.data);
        }
        catch (error) {
            console.log("error:", error);
            dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: error });
        }
    }
}

export const clearCart = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: CLEAR_CART_REQUEST});
        try {
            const response = await api.delete(`api/cart/clear`,{},{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            dispatch({ type: CLEAR_CART_SUCCESS, payload: response.data });
            console.log('Cleared cart successfully are:', response.data);
        }
        catch (error) {
            console.log("error:", error);
            dispatch({ type: CLEAR_CART_FAILURE, payload: error });
        }
    }
}
