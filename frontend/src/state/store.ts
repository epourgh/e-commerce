import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'

let userInfo;
if (localStorage.getItem('userInfo')) {
    userInfo = JSON.parse(localStorage.getItem('userInfo'))
} else {
    userInfo = { data: { _id: 0, name: '', username: '', token: '' }, error: null, loading: false };
}

let cart;
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart')).data
} else {
    cart = { product: [], total: { count: 0, cost: 0 }, address: { address: '', city: '', country: '', postalCode: '' }, payment: '' };
}

let viewed;
if (localStorage.getItem('viewed')) {
    viewed = JSON.parse(localStorage.getItem('viewed')).data
} else {
    viewed = [{ product: [], total: { count: 0, cost: 0 }, address: { address: '', city: '', country: '', postalCode: '' }, payment: '' }];
}

const initialState = {
    productList: { data: [], error: null, loading: false},
    userInfo,
    cart,
    viewed
};

const middleware = [thunk];

export const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));