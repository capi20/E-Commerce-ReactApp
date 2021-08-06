import * as actionTypes from '../actionTypes'
import updateObject from '../../utility/updateObject'

const initialState = {
    cart: [],
    user: null,
    amount: 0,
    count: 0,
    purchasing: false,
    contactData: null
}

const addItem = (state, action) => {
    const updatedCart = [...state.cart].concat(action.item)
    const updatedState = {
        cart: updatedCart,
        amount: state.amount + action.item.price,
        count: state.count + 1,
        purchasing: true
    }
    return updateObject(state, updatedState)
}

const removeItem = (state, action) => {
    const itemIndex = state.cart.findIndex(
        cartItem => cartItem.id === action.itemId
    )
    let updatedCart = [...state.cart]
    let updatedAmount = 0
    let updatedCount = 0
    let purchasingState = null

    if (itemIndex >= 0) {
        updatedAmount = state.amount - updatedCart[itemIndex].price
        updatedCount = state.count - 1
        updatedCart.splice(itemIndex, 1)
        purchasingState = updatedCount > 0 ? true : false
    } else {
        console.warn(`Can't remove product (id: ${action.itemId}) as it's not in cart!`)
    }

    const updatedState = {
        cart: updatedCart,
        amount: updatedAmount,
        count: updatedCount,
        purchasing: purchasingState
    }
    return updateObject(state, updatedState)
}

// const setUser = (state, action) => {
//     return updateObject(state, action.user)
// }

const setContactData = (state, action) => {
    let fullData = {...action.data}
    fullData['email'] = state.user.email
    return updateObject(state, {
        contactData: fullData
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART: return addItem(state, action)
        case actionTypes.REMOVE_FROM_CART: return removeItem(state, action)
        case actionTypes.SET_USER: 
            return {
                ...state,
                user: action.user
            }
        case actionTypes.SET_CONTACT_DATA: return setContactData(state, action)
        default: return state
    }
}

export default reducer