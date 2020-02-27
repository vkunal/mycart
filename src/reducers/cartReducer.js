import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, UPDATE_CART } from '../actions/action-types/cart-actions'


const initState = {
    items: [],
    addedItems: [],
    total: 0
}

const cartReducer = (state = initState, action) => {

    if (action.type === UPDATE_CART) {
        return {
            ...state,
            items: [...action.data],
            total: 0
        }
    }

    if (action.type === ADD_TO_CART) {
        let existedItemIndex = state.addedItems.findIndex(item => action.id === item.id)
        let existedItem = state.addedItems.find(item => action.id === item.id)
        if (existedItem) {
            existedItem.quantity += 1
            return {
                ...state,
                addedItems: [...state.addedItems.slice(0, existedItemIndex), existedItem, ...state.addedItems.slice(existedItemIndex + 1)],
                total: state.total + existedItem.price - (existedItem.price * existedItem.discount / 100)
            }
        } else {
            let addedItem = state.items.find(item => item.id === action.id)
            let newTotal = state.total + addedItem.price - (addedItem.price * addedItem.discount / 100)
            addedItem.quantity = 1;
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }
        }        
    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
        console.log(itemToRemove)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + (addedItem.price - (addedItem.price * addedItem.discount / 100));
        return {
            ...state,
            total: newTotal
        }
    }
    if (action.type === SUB_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - (addedItem.price - (addedItem.price * addedItem.discount / 100));
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - (addedItem.price - (addedItem.price * addedItem.discount / 100));
            return {
                ...state,
                total: newTotal
            }
        }

    }
    else {
        return state
    }

}

export default cartReducer
