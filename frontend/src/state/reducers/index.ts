import { combineReducers } from 'redux';
import ProductListReducer from './productListReducer';
import ProductDetailsReducer from './productDetailsReducer';
import UserInfoReducer from './userInfoReducer';
import CartReducer from './cartReducer';
import ViewedPageReducer from './viewedPageReducer';
import OrderReducer from './orderReducer';
import OrderDetailsReducer from './orderDetailsReducer';
import UserOrdersReducer from './userOrdersReducer';
import PaymentReducer from './paymentReducer';
import PaymentIntentReducer from './paymentIntentReducer';
import ReviewReducer from './reviewReducer';
import RefundReducer from './refundReducer';
import FavoriteReducer from './favoriteReducer';

const reducers = combineReducers({
    productList: ProductListReducer,
    productDetails: ProductDetailsReducer,
    userInfo: UserInfoReducer,
    cart: CartReducer,
    viewed: ViewedPageReducer,
    order: OrderReducer,
    orderDetails: OrderDetailsReducer,
    userOrders: UserOrdersReducer,
    payment: PaymentReducer,
    paymentIntent: PaymentIntentReducer,
    reviewReducer: ReviewReducer,
    refundReducer: RefundReducer,
    userFavorite: FavoriteReducer,
});

export default reducers;

// typescript instructions for code above that we're creating reducers,
// which internally calls some of our reducers
export type RootState = ReturnType<typeof reducers extends (...args: any) => infer R ? R : any>;

// original generic does not implicitly infer type in webpack
// const reducers: Function
// Type 'Function' does not satisfy the constraint '(...args: any) => any'.
// Type 'Function' provides no match for the signature '(...args: any): any'.ts(2344)
// export type RootState = ReturnType<typeof reducers>;