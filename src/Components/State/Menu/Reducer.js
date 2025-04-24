import * as actionTypes from './ActionType7';

const initialState = {
    menuItems: [],
    loading:false,
    error:null,
    search:[],
    message:null
}

export  const menuItemReducer = (state = initialState,action) => {
    switch (action.type){
        case actionTypes.CREATE_MENU_ITEM_REQUEST:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case actionTypes.UPDATE_MENU_ITEM_AVAILABILTY_REQUEST:
        case actionTypes.DELETE_MENU_ITEM_REQUEST:
        case actionTypes.SEARCH_MENU_ITEM_REQUEST:
            return {
                ...state,
                loading:true,
                error:null,
                message:null
            };

        case actionTypes.CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading:false,
                menuItems: [...state.menuItems, action.payload],
                message : "Food created Successfully"
            };

        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return {
                ...state,
                loading:false,
                menuItems: action.payload,
            };

        case actionTypes.UPDATE_MENU_ITEM_AVAILABILTY_SUCCESS:
            return {
                ...state,
                loading:false,
                menuItems: state.menuItems.map(
                    (menuitem) => menuitem.id === action.payload.id ? action.payload : menuitem 
                ),
                    message : "Food updated Successfully"
                };

        case actionTypes.SEARCH_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading:false,
                search:action.payload
                };
        
        case actionTypes.CREATE_MENU_ITEM_FAILURE:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case actionTypes.DELETE_MENU_ITEM_FAILURE:
        case actionTypes.SEARCH_MENU_ITEM_FAILURE:
        case actionTypes.UPDATE_MENU_ITEM_AVAILABILTY_FAILURE:
            return {
                ...state,
                laoding:false,
                error:action.payload,
                message:null
            };

        default :
            return state;
    }
};