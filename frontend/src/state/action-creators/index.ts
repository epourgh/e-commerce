import axios from 'axios';

// an interface for dispatch from redux
import { Dispatch } from '@redux-d-ts';
import { Action } from '../actions/index';
import { ActionType } from '../action-types/index'
import { ShopList, Address, SampleOrderReducer, SampleRefundReducer, SamplePaymentIntentReducer, 
         SamplePaymentReducer, SampleReviewReducer, SampleProductReducer, SampleFavoriteReducer } from '../data-types/index';

const backendURL = 'http://127.0.0.1:8000';

interface Params {
    id?: number
}

interface ProductParams {
    id: number,
    qty: number,
    product: ShopList
}

function isEmpty(obj: Params) {
    return Object.keys(obj).length === 0;
}

export const fetchProductList = (params: Params = {}) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_PRODUCT_LIST
        })

        try {
            const request = `${backendURL}/api/products`
            const { data } = (isEmpty(params)) ? await axios.get(request) : await axios.get(request, { params });

            dispatch({
                type: ActionType.GET_PRODUCT_LIST_SUCCESS,
                payload: data
            })

        } catch (err) {
            dispatch({
                type: ActionType.GET_PRODUCT_LIST_ERROR,
                payload: err.message
            })
        }
    }
}

export const fetchProductDetails = (id: number, params: Params = {}) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_PRODUCT_DETAILS
        })

        try {
            const request = `${backendURL}/api/products/${id}`
            const { data } = (isEmpty(params)) ? await axios.get(request) : await axios.get(request, { params });

            dispatch({
                type: ActionType.GET_PRODUCT_DETAILS_SUCCESS,
                payload: data
            })

        } catch (err) {
            dispatch({
                type: ActionType.GET_PRODUCT_DETAILS_ERROR,
                payload: err.message
            })
        }
    }
}

export const cart = (action: string, product: ProductParams) => {
    return async (dispatch: Dispatch<Action>) => {
        if (action === 'ADD') {
            dispatch({
                type: ActionType.CART_ADD,
                payload: product
            })
        }

        if (action === 'REMOVE') {
            dispatch({
                type: ActionType.CART_REMOVE,
                payload: product
            })
        }
    }
}

interface LoginParams {
    email: string;
    password: string;
}

export const UserLogin = (params: LoginParams) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.GET_USER_INFO
        })

        try {
            const request = `${backendURL}/api/users/login/`
            const { data } = await axios({
                method: 'POST',
                url: request,
                data: { username: params.email, password: params.password }
            });

            dispatch({
                type: ActionType.GET_USER_INFO_SUCCESS,
                payload: data
            })


            localStorage.setItem('userInfo', JSON.stringify({ data, error: null, loading: false }))

        } catch (err) {
            dispatch({
                type: ActionType.GET_USER_INFO_ERROR,
                payload: err.message
            })
        }
    }
}

interface RegistrationParams {
    name: string;
    email: string;
    password: string;
}

export const UserRegistration = (params: RegistrationParams) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.POST_USER_REGISTRATION
        })

        try {
            const request = `${backendURL}/api/users/register/`
            const { data } = await axios({
                method: 'POST',
                url: request,
                data: { name: params.name, email: params.email, password: params.password }
            });

            dispatch({
                type: ActionType.POST_USER_REGISTRATION_SUCCESS,
                payload: data
            })

        } catch (err) {
            dispatch({
                type: ActionType.POST_USER_REGISTRATION_ERROR,
                payload: err.message
            })
        }
    }
}

export const UserLogout = () => {
    localStorage.removeItem('userInfo')
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.USER_LOGOUT
        })
    }
}

interface UserProfileEditParams {
    name: string;
    email: string;
    password: string;
    token: string;
}

// PUT_PROFILE
export const UserProfileEdit = (params: UserProfileEditParams) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.PUT_PROFILE
        })

        try {
            const request = `${backendURL}/api/users/profile/update/`
            const { data } = await axios({
                method: 'PUT',
                url: request,
                data: { name: params.name, email: params.email, password: params.password },
                headers: {
                    'authorization': `Bearer ${params.token}`
                }
            });

            dispatch({
                type: ActionType.PUT_PROFILE_SUCCESS,
                payload: data
            })

        } catch (err) {
            dispatch({
                type: ActionType.PUT_PROFILE_ERROR,
                payload: err.message
            })
        }
    }
}

export const SaveAddress = (data: Address) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SAVE_ADDRESS,
            payload: data
        })
    }
}

export const SavePaymentMethod = (method: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SAVE_PAYMENT_METHOD,
            payload: method
        })
    }
}

export const Order = (order: SampleOrderReducer, token: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({ type: ActionType.POST_ORDER })

        try {
            const request = `${backendURL}/api/orders/add/`
            const { data } = await axios({
                method: 'POST',
                url: request,
                data: order,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            dispatch({ type: ActionType.CART_CLEAR })

            dispatch({
                type: ActionType.POST_ORDER_SUCCESS,
                payload: data
            })


        } catch (err) {
            dispatch({
                type: ActionType.POST_ORDER_ERROR,
                payload: err.message
            })
        }
    }
}

export const setRefund = (refund: SampleRefundReducer, token: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({ type: ActionType.POST_REFUND })

        try {
            const request = `${backendURL}/api/orders/${refund.orderId}/refund/`
            const { data } = await axios({
                method: 'POST',
                url: request,
                data: refund,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            dispatch({
                type: ActionType.POST_REFUND_SUCCESS,
                payload: data
            })


        } catch (err) {
            dispatch({
                type: ActionType.POST_REFUND_ERROR,
                payload: err.message
            })
        }
    }
}

export const setFavorite = (favorite: SampleFavoriteReducer, token: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({ type: ActionType.POST_FAVORITE })

        try {
            const request = `${backendURL}/api/users/favorite/add/${favorite.productId}/`
            const { data } = await axios({
                method: 'POST',
                url: request,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            dispatch({
                type: ActionType.POST_FAVORITE_SUCCESS,
                payload: data
            })


        } catch (err) {
            dispatch({
                type: ActionType.POST_FAVORITE_ERROR,
                payload: err.message
            })
        }
    }
}

export const unsetFavorite = (favorite: SampleFavoriteReducer, token: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({ type: ActionType.DELETE_FAVORITE })

        try {
            const request = `${backendURL}/api/users/favorite/remove/${favorite.productId}/`
            const { data } = await axios({
                method: 'DELETE',
                url: request,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            dispatch({
                type: ActionType.DELETE_FAVORITE_SUCCESS,
                payload: data
            })


        } catch (err) {
            dispatch({
                type: ActionType.DELETE_FAVORITE_ERROR,
                payload: err.message
            })
        }
    }
}


export const getFavoriteById = (favorite: SampleFavoriteReducer, token: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({ type: ActionType.GET_FAVORITE_BY_ID })

        try {
            const request = `${backendURL}/api/users/favorite/${favorite.productId}/`
            const { data } = await axios({
                method: 'GET',
                url: request,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            dispatch({
                type: ActionType.GET_FAVORITE_BY_ID_SUCCESS,
                payload: data
            })


        } catch (err) {
            dispatch({
                type: ActionType.GET_FAVORITE_BY_ID_ERROR,
                payload: err.message
            })
        }
    }
}


export const getFavorites = (token: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({ type: ActionType.GET_FAVORITES })

        try {
            const request = `${backendURL}/api/users/favorites/`
            const { data } = await axios({
                method: 'GET',
                url: request,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            dispatch({
                type: ActionType.GET_FAVORITES_SUCCESS,
                payload: data
            })


        } catch (err) {
            dispatch({
                type: ActionType.GET_FAVORITES_ERROR,
                payload: err.message
            })
        }
    }
}

export const setPaymentIntent = (order: SamplePaymentIntentReducer, token: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({ type: ActionType.POST_PAYMENT_INTENT })

        try {
            const request = `${backendURL}/api/orders/${order._id}/paymentintent/`
            const { data } = await axios({
                method: 'POST',
                url: request,
                data: order,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            dispatch({
                type: ActionType.POST_PAYMENT_INTENT_SUCCESS,
                payload: data
            })


        } catch (err) {
            dispatch({
                type: ActionType.POST_PAYMENT_INTENT_ERROR,
                payload: err.message
            })
        }
    }
}



export const putPayment = (order: SamplePaymentReducer, token: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({ type: ActionType.PUT_PAYMENT })

        try {
            const request = `${backendURL}/api/orders/${order._id}/pay/`
            const { data } = await axios({
                method: 'PUT',
                url: request,
                data: order,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            dispatch({
                type: ActionType.PUT_PAYMENT_SUCCESS,
                payload: data
            })


        } catch (err) {
            dispatch({
                type: ActionType.PUT_PAYMENT_ERROR,
                payload: err.message
            })
        }
    }
}

export const fetchOrderDetails = (id: number, params: UserProfileEditParams) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_ORDER_DETAILS
        })

        try {

            const request = `${backendURL}/api/orders/${id}`
            const { data } = await axios({
                method: 'GET',
                url: request,
                headers: {
                    'authorization': `Bearer ${params.token}`
                }
            });

            dispatch({
                type: ActionType.GET_ORDER_DETAILS_SUCCESS,
                payload: data
            })

        } catch (err) {
            dispatch({
                type: ActionType.GET_ORDER_DETAILS_ERROR,
                payload: err.message
            })
        }
    }
}

export const fetchUserOrders = (params: UserProfileEditParams) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_USER_ORDERS
        })

        try {

            const request = `${backendURL}/api/orders/myorders`
            const { data } = await axios({
                method: 'GET',
                url: request,
                headers: {
                    'authorization': `Bearer ${params.token}`
                }
            });

            dispatch({
                type: ActionType.GET_USER_ORDERS_SUCCESS,
                payload: data
            })

        } catch (err) {
            dispatch({
                type: ActionType.GET_USER_ORDERS_ERROR,
                payload: err.message
            })
        }
    }
}

export const postReview = (review: SampleReviewReducer, token: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({ type: ActionType.POST_REVIEW })

        try {
            const request = `${backendURL}/api/products/${review.productId}/reviews/`
            const { data } = await axios({
                method: 'POST',
                url: request,
                data: review,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            dispatch({
                type: ActionType.POST_REVIEW_SUCCESS,
                payload: data
            })


        } catch (err) {
            dispatch({
                type: ActionType.POST_REVIEW_ERROR,
                payload: err.message
            })
        }
    }
}


export const checkIfReviewed = (review: SampleReviewReducer, token: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({ type: ActionType.CHECK_IF_REVIEWED })

        try {
            const request = `${backendURL}/api/products/${review.productId}/reviewed/`
            const { data } = await axios({
                method: 'GET',
                url: request,
                data: review,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            dispatch({
                type: ActionType.CHECK_IF_REVIEWED_SUCCESS,
                payload: data
            })


        } catch (err) {
            dispatch({
                type: ActionType.CHECK_IF_REVIEWED_ERROR,
                payload: err.message
            })
        }
    }
}