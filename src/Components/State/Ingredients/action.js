import { API_URL, api } from "../../Config/api"
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_FAILURE, CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, UPDATE_STOCK} from "./ActionType5";

export const getIngredient = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.get(
                `api/admin/ingredients/restaurant/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("Get all ingredients of restaurant", response.data);
            dispatch({ type: GET_INGREDIENTS, payload: response.data })

        } catch (error) {
            console.log("error:", error);
        }
    }
}

export const createIngredient = ({ data, jwt }) => {
    return async (dispatch) => {
        dispatch({type:CREATE_INGREDIENT_REQUEST});
        try {
            const response = await api.post(
                `api/admin/ingredients`,data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("Created ingredients: ", response.data);
            dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data })

        } catch (error) {
            console.log("error:", error);
            dispatch({type:CREATE_INGREDIENT_FAILURE,payload:error})
        }
    }
}

export const createIngredientCategory = ({ data, jwt }) => {
    return async (dispatch) => {
        dispatch({type:CREATE_INGREDIENT_CATEGORY_REQUEST});
        try {
            const response = await api.post(
                `api/admin/ingredients/category`,data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("Created ingredients for Category:", response.data);
            dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data })

        } catch (error) {
            console.log("error:", error);
            dispatch({type:CREATE_INGREDIENT_CATEGORY_FAILURE,payload:error})
        }
    }
}

export const getIngredientCategory = ({ id, jwt }) => {
    return async (dispatch) => {
        dispatch({type:GET_INGREDIENT_CATEGORY_REQUEST});
        try {
            const response = await api.get(
                `api/admin/ingredients/restaurant/${id}/category`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("Get all ingredients of restaurant", response.data);
            dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data })

        } catch (error) {
            console.log("error:", error);
            dispatch({type:GET_INGREDIENT_CATEGORY_FAILURE,payload:error})
        }
    }
}

export const updateStock = ({id,jwt}) => {
    return async (dispatch) => {
        try {
            const response = await api.put(
                `api/admin/ingredients/${id}/stoke`,{},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("Get all ingredients of restaurant", response.data);
            dispatch({ type: UPDATE_STOCK, payload: response.data })

        } catch (error) {
            console.log("error:", error);
        }
    }
}
