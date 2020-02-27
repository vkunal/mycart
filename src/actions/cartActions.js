
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY, UPDATE_CART, REQUEST_API_DATA, RECEIVE_API_DATA} from './action-types/cart-actions'

export const requestApiData = () =>{
    return {
        type: REQUEST_API_DATA
    }
}

export const receiveApiData = (data) =>{
    return {
        type: RECEIVE_API_DATA,
        data
    }
}

//update cart action
export const getProductList= (data) => {
    return {
        type: UPDATE_CART,
        data
    }
}

//add cart action
export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}
//remove item action
export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity=(id)=>{
    return{
        type: SUB_QUANTITY,
        id
    }
}
//add qt action
export const addQuantity=(id)=>{
    return{
        type: ADD_QUANTITY,
        id
    }
}
