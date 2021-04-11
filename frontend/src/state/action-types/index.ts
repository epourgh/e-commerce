export enum ActionType {
    GET_PRODUCT_LIST = 'get_product_list_request',
    GET_PRODUCT_LIST_SUCCESS = 'get_product_list_success',
    GET_PRODUCT_LIST_ERROR = 'get_product_list_error',

    GET_PRODUCT_LIST_BY_ID = 'get_product_list_by_id_request',
    GET_PRODUCT_LIST_BY_ID_SUCCESS = 'get_product_list_by_id_success',
    GET_PRODUCT_LIST_BY_ID_ERROR = 'get_product_list_by_id_error',
    
    GET_PRODUCT_DETAILS = 'get_product_details_request',
    GET_PRODUCT_DETAILS_SUCCESS = 'get_product_details_success',
    GET_PRODUCT_DETAILS_ERROR = 'get_product_details_error',

    GET_USER_INFO = 'get_user_info_request',
    GET_USER_INFO_SUCCESS = 'get_user_info_success',
    GET_USER_INFO_ERROR = 'get_user_info_error',
    
    USER_LOGOUT = 'user_logout',
    
    POST_USER_REGISTRATION = 'post_user_registration_request',
    POST_USER_REGISTRATION_SUCCESS = 'post_user_registration_success',
    POST_USER_REGISTRATION_ERROR = 'post_user_registration_error',
    
    PUT_PROFILE = 'put_profile_request',
    PUT_PROFILE_SUCCESS = 'put_profile_success',
    PUT_PROFILE_ERROR = 'put_profile_error',
    
    CART_ADD = 'cart_add',
    CART_REMOVE = 'cart_remove',
    
    SAVE_ADDRESS = 'save_address',
    SAVE_PAYMENT_METHOD = 'save_payment_method',
    
    POST_ORDER = 'post_order_request',
    POST_ORDER_SUCCESS = 'post_order_success',
    POST_ORDER_ERROR = 'post_order_error',

    POST_REFUND = 'post_refund_request',
    POST_REFUND_SUCCESS = 'post_refund_success',
    POST_REFUND_ERROR = 'post_refund_error',

    PUT_PAYMENT = 'put_payment_request',
    PUT_PAYMENT_SUCCESS = 'put_payment_success',
    PUT_PAYMENT_ERROR = 'put_payment_error',

    POST_PAYMENT_INTENT = 'post_payment_intent_request',
    POST_PAYMENT_INTENT_SUCCESS = 'post_payment_intent_success',
    POST_PAYMENT_INTENT_ERROR = 'post_payment_intent_error',

    GET_ORDER_DETAILS = 'get_order_details_request',
    GET_ORDER_DETAILS_SUCCESS = 'get_order_details_success',
    GET_ORDER_DETAILS_ERROR = 'get_order_details_error',

    GET_USER_ORDERS = 'get_user_orders_request',
    GET_USER_ORDERS_SUCCESS = 'get_user_orders_success',
    GET_USER_ORDERS_ERROR = 'get_user_orders_error',
    
    CART_CLEAR = 'cart_clear',

    POST_REVIEW = 'post_review_request',
    POST_REVIEW_SUCCESS = 'post_review_success',
    POST_REVIEW_ERROR = 'post_review_error',

    CHECK_IF_REVIEWED = 'check_if_reviewed_request',
    CHECK_IF_REVIEWED_SUCCESS = 'check_if_reviewed_success',
    CHECK_IF_REVIEWED_ERROR = 'check_if_reviewed_error',

    POST_FAVORITE = 'post_favorite_request',
    POST_FAVORITE_SUCCESS = 'post_favorite_success',
    POST_FAVORITE_ERROR = 'post_favorite_error',

    DELETE_FAVORITE = 'delete_favorite_request',
    DELETE_FAVORITE_SUCCESS = 'delete_favorite_success',
    DELETE_FAVORITE_ERROR = 'delete_favorite_error',

    GET_FAVORITES = 'get_favorites_request',
    GET_FAVORITES_SUCCESS = 'get_favorites_success',
    GET_FAVORITES_ERROR = 'get_favorites_error',

    GET_FAVORITE_BY_ID = 'get_favorite_by_id_request',
    GET_FAVORITE_BY_ID_SUCCESS = 'get_favorite_by_id_success',
    GET_FAVORITE_BY_ID_ERROR = 'get_favorite_by_id_error',
}