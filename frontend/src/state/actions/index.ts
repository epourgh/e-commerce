import { ActionType } from '../action-types/index'
import { ShopList, UserInfo, Address, SampleOrderReducer, Product, Total } from '../data-types/index';

// Product List

interface ProductListAction {
    type: ActionType.GET_PRODUCT_LIST;
}

interface ProductListSuccessAction {
    type: ActionType.GET_PRODUCT_LIST_SUCCESS;
    payload: ShopList[];
}

interface ProductListErrorAction {
    type: ActionType.GET_PRODUCT_LIST_ERROR;
    payload: string;
}

// Product Details

interface ProductDetailsAction {
    type: ActionType.GET_PRODUCT_DETAILS;
}

interface ProductDetailsSuccessAction {
    type: ActionType.GET_PRODUCT_DETAILS_SUCCESS;
    payload: ShopList;
}

interface ProductDetailsErrorAction {
    type: ActionType.GET_PRODUCT_DETAILS_ERROR;
    payload: string;
}

// User Login Info

interface UserInfoAction {
    type: ActionType.GET_USER_INFO;
}

interface UserInfoSuccessAction {
    type: ActionType.GET_USER_INFO_SUCCESS;
    payload: UserInfo;
}

interface UserInfoErrorAction {
    type: ActionType.GET_USER_INFO_ERROR;
    payload: string;
}

// User Logout

interface UserLogoutAction {
    type: ActionType.USER_LOGOUT;
}

// User Registration

interface UserRegistrationAction {
    type: ActionType.POST_USER_REGISTRATION;
}

interface UserRegistrationSuccessAction {
    type: ActionType.POST_USER_REGISTRATION_SUCCESS;
    payload: SampleOrderReducer;
}

interface UserRegistrationErrorAction {
    type: ActionType.POST_USER_REGISTRATION_ERROR;
    payload: string;
}

// Profile Update

interface ProfileAction {
    type: ActionType.PUT_PROFILE;
}

interface ProfileSuccessAction {
    type: ActionType.PUT_PROFILE_SUCCESS;
    payload: UserInfo;
}

interface ProfileErrorAction {
    type: ActionType.PUT_PROFILE_ERROR;
    payload: string;
}

// cart

interface CartAddAction {
    type: ActionType.CART_ADD;
    payload: { id: number, qty: number, product: ShopList};
}

interface CartRemoveAction {
    type: ActionType.CART_REMOVE;
    payload: {id: number};
}

interface CartClearAction {
    type: ActionType.CART_CLEAR;
}

// address

interface SaveAddressAction {
    type: ActionType.SAVE_ADDRESS;
    payload: Address;
}

// Payment Method

interface SavePaymentMethodAction {
    type: ActionType.SAVE_PAYMENT_METHOD;
    payload: string;
}

// Post Refund

interface RefundAction {
    type: ActionType.POST_REFUND;
}

interface RefundSuccessAction {
    type: ActionType.POST_REFUND_SUCCESS;
}

interface RefundErrorAction {
    type: ActionType.POST_REFUND_ERROR;
    payload: string;
}

// Post Favorite

interface PostFavoriteAction {
    type: ActionType.POST_FAVORITE;
}

interface PostFavoriteSuccessAction {
    type: ActionType.POST_FAVORITE_SUCCESS;
}

interface PostFavoriteErrorAction {
    type: ActionType.POST_FAVORITE_ERROR;
    payload: string;
}

// Post Favorite

interface DeleteFavoriteAction {
    type: ActionType.DELETE_FAVORITE;
}

interface DeleteFavoriteSuccessAction {
    type: ActionType.DELETE_FAVORITE_SUCCESS;
}

interface DeleteFavoriteErrorAction {
    type: ActionType.DELETE_FAVORITE_ERROR;
    payload: string;
}

// Get Favorites

interface GetFavoritesAction {
    type: ActionType.GET_FAVORITES;
}

interface GetFavoritesSuccessAction {
    type: ActionType.GET_FAVORITES_SUCCESS;
    payload: any;
}

interface GetFavoritesErrorAction {
    type: ActionType.GET_FAVORITES_ERROR;
    payload: string;
}

// Get Favorite by Id

interface GetFavoriteByIdAction {
    type: ActionType.GET_FAVORITE_BY_ID;
}

interface GetFavoriteByIdSuccessAction {
    type: ActionType.GET_FAVORITE_BY_ID_SUCCESS;
    payload: any;
}

interface GetFavoriteByIdErrorAction {
    type: ActionType.GET_FAVORITE_BY_ID_ERROR;
    payload: string;
}

// Post Order Update

interface OrderAction {
    type: ActionType.POST_ORDER;
}

interface OrderSuccessAction {
    type: ActionType.POST_ORDER_SUCCESS;
    payload: any;
}

interface OrderErrorAction {
    type: ActionType.POST_ORDER_ERROR;
    payload: string;
}

// Put Order Update

interface PaymentAction {
    type: ActionType.PUT_PAYMENT;
}

interface PaymentSuccessAction {
    type: ActionType.PUT_PAYMENT_SUCCESS;
    payload: any;
}

interface PaymentErrorAction {
    type: ActionType.PUT_PAYMENT_ERROR;
    payload: string;
}

// Post Payment Intent

interface PaymentIntentAction {
    type: ActionType.POST_PAYMENT_INTENT;
}

interface PaymentIntentSuccessAction {
    type: ActionType.POST_PAYMENT_INTENT_SUCCESS;
    payload: any;
}

interface PaymentIntentErrorAction {
    type: ActionType.POST_PAYMENT_INTENT_ERROR;
    payload: string;
}


// Order Details

interface OrderDetailsAction {
    type: ActionType.GET_ORDER_DETAILS;
}

interface OrderDetailsSuccessAction {
    type: ActionType.GET_ORDER_DETAILS_SUCCESS;
    payload: any;
}

interface OrderDetailsErrorAction {
    type: ActionType.GET_ORDER_DETAILS_ERROR;
    payload: string;
}


// Order Details

interface UserOrdersAction {
    type: ActionType.GET_USER_ORDERS;
}

interface UserOrdersSuccessAction {
    type: ActionType.GET_USER_ORDERS_SUCCESS;
    payload: any;
}

interface UserOrdersErrorAction {
    type: ActionType.GET_USER_ORDERS_ERROR;
    payload: string;
}

// POST REVIEW

interface PostReviewAction {
    type: ActionType.POST_REVIEW;
}

interface PostReviewSuccessAction {
    type: ActionType.POST_REVIEW_SUCCESS;
}

interface PostReviewErrorAction {
    type: ActionType.POST_REVIEW_ERROR;
    payload: string;
}

// CHECK IF REVIEWED

interface CheckIfReviewedAction {
    type: ActionType.CHECK_IF_REVIEWED;
}

interface CheckIfReviewedSuccessAction {
    type: ActionType.CHECK_IF_REVIEWED_SUCCESS;
    payload: string;
}

interface CheckIfReviewedErrorAction {
    type: ActionType.CHECK_IF_REVIEWED_ERROR;
    payload: string;
}

export type Action =
    | ProductListAction
    | ProductListSuccessAction
    | ProductListErrorAction
    | ProductDetailsAction
    | ProductDetailsSuccessAction
    | ProductDetailsErrorAction
    | UserInfoAction
    | UserInfoSuccessAction
    | UserInfoErrorAction
    | UserLogoutAction
    | UserRegistrationAction
    | UserRegistrationSuccessAction
    | UserRegistrationErrorAction
    | ProfileAction
    | ProfileSuccessAction
    | ProfileErrorAction
    | CartAddAction
    | CartRemoveAction
    | CartClearAction
    | SaveAddressAction
    | SavePaymentMethodAction
    | OrderAction
    | OrderSuccessAction
    | OrderErrorAction
    | OrderDetailsAction
    | OrderDetailsSuccessAction
    | OrderDetailsErrorAction
    | UserOrdersAction
    | UserOrdersSuccessAction
    | UserOrdersErrorAction
    | PaymentAction
    | PaymentSuccessAction
    | PaymentErrorAction
    | PaymentIntentAction
    | PaymentIntentSuccessAction
    | PaymentIntentErrorAction
    | PostReviewAction 
    | PostReviewSuccessAction 
    | PostReviewErrorAction
    | RefundAction
    | RefundSuccessAction
    | RefundErrorAction
    | PostFavoriteAction 
    | PostFavoriteSuccessAction 
    | PostFavoriteErrorAction 
    | DeleteFavoriteAction 
    | DeleteFavoriteSuccessAction 
    | DeleteFavoriteErrorAction 
    | GetFavoritesAction 
    | GetFavoritesSuccessAction 
    | GetFavoritesErrorAction 
    | GetFavoriteByIdAction 
    | GetFavoriteByIdSuccessAction 
    | GetFavoriteByIdErrorAction
    | CheckIfReviewedAction
    | CheckIfReviewedSuccessAction
    | CheckIfReviewedErrorAction;
