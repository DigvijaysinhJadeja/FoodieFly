import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import { thunk } from "redux-thunk"
import { authReducer } from "./Authentication/Reducer"
import { RestaurantReducer } from "./Restaurant/Reducer";
import { menuItemReducer } from "./Menu/Reducer";
import { cartReducer } from "./Cart/reducer";
import { orderReducer } from "./Order/reducer";
import { restarantOrderReducer } from "./RestaurantOrder/reducer";
import { ingredientReducer } from "./Ingredients/reducer";

const rooteReducer = combineReducers({
    auth:authReducer,
    restaurant:RestaurantReducer,
    menu:menuItemReducer,
    cart:cartReducer,
    order:orderReducer,
    restaurantOrders:restarantOrderReducer,
    ingredient : ingredientReducer,
})

// created store
export const store = legacy_createStore(rooteReducer,applyMiddleware(thunk));