import { api } from '../../Config/api'
import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEM_AVAILABILITY_FAILURE, UPDATE_MENU_ITEM_AVAILABILITY_REQUEST, UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS } from './ActionType7'

export const createMenuItem = ({ menu, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST })
        try {
            const response = await api.post('/api/admin/food', menu, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: response.data })
            console.log("Created Menu", response.data)
        } catch (error) {
            dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error })
            console.log("error:", error)
        }
    }
}

export const getMenuItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST })
        let queryParams = [];
        if (reqData.vegetarian !== undefined) queryParams.push(`vegetarian=${reqData.vegetarian}`);
        if (reqData.nonveg !== undefined) queryParams.push(`nonveg=${reqData.nonveg}`);
        if (reqData.seasonal !== undefined) queryParams.push(`seasonal=${reqData.seasonal}`);
        if (reqData.foodCategory) queryParams.push(`food_category=${reqData.foodCategory}`);

        const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
        try {
            const response = await api.get(`/api/food/restaurant/${reqData.restaurantId}${queryString}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
                
            const menuData = response.data;
            const uniqueMenuMap = new Map();

            menuData.forEach(item => {
                const key = `${item.name}-${item.price}`;
                const existing = uniqueMenuMap.get(key);

                if (!existing) {
                    uniqueMenuMap.set(key, item);
                } else {
                    const existingIngredients = existing.ingredients?.length || 0;
                    const newIngredients = item.ingredients?.length || 0;

                    // Keep the one with more ingredients
                    if (newIngredients > existingIngredients) {
                        uniqueMenuMap.set(key, item);
                    }
                }
            });

            const uniqueMenuItems = Array.from(uniqueMenuMap.values());

            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: uniqueMenuItems});
            console.log("Menu Items", uniqueMenuItems)
        } catch (error) {
            console.log("error:", error)
            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });    
        }
    }
}

export const searchMenuItem = ({ keyword, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_MENU_ITEM_REQUEST })
        try {
            const response = await api.get(`/api/food/search?name=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: response.data });
            console.log("Search Menu Items", response.data)
        } catch (error) {
            dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
            console.log("error:", error)
        }
    }
}

export const updateMenuItemAvailabilty = ({foodId,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_REQUEST})
        try {
            const response = await api.put(`/api/admin/food/${foodId}`,{},{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            })
            dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS, payload: response.data });
            console.log("Update Menu Item Availabilty", response.data)
            } catch (error) {
                dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_FAILURE, payload: error });
                console.log("error:", error)
            }
        }
}

export const deleteMenuItem = ({foodId,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_MENU_ITEM_REQUEST })
        try {
            const response = await api.delete(`/api/admin/food/${foodId}` ,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            });
            dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: response.data });
            console.log("Delete Menu Item", response.data)
        } catch (error) {
            dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
            console.log("error:", error)
            }
        }
}


