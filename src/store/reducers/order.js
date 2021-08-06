import * as actionTypes from '../actionTypes'
import updateObject from '../../utility/updateObject'

const initialState = {
    orders: [],
    loading: false,
    puchased: false
}

const placeOrderSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId})
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_INIT: return updateObject(state, { purchased: false })
        case actionTypes.PLACE_ORDER_START: return updateObject(state, { loading: true })
        case actionTypes.PLACE_ORDER_SUCCESS: return placeOrderSuccess(state, action)
        case actionTypes.PLACE_ORDER_FAIL: return updateObject(state, { loading: false })
        case actionTypes.FETCH_ORDERS_START: return updateObject(state, { loading: true })
        case actionTypes.FETCH_ORDERS_SUCCESS: 
            return updateObject(state, {
                orders: action.orders,
                loading: false
            })
        case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, { loading: false })
        default: return state
    }
}

export default reducer