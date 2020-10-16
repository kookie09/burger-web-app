import * as actionTypes from '../actions/actionType';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseBurgerInit = (state, action) => {
    return updateObject(state, { purchase: false });
};

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {
        id: action.orderId
    });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });

};

const purchaseOrderStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const purchaseOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};

const purchaseOrderFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseBurgerInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return purchaseOrderStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return purchaseOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return purchaseOrderFail(state, action);

        default: return state;
    }
};

export default reducer;