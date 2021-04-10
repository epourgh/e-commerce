import { Action } from '../actions/index'
import { ActionType } from '../action-types/index'
import { SampleOrderReducer } from '../data-types/index';

interface SampleReducer {
    loading?: boolean;
    error?: string | null;
    data?: SampleOrderReducer;
}

const initialState = {
    loading: false,
    error: null,
    data: {
        order: {
            paymentMethod: '',
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: 0,
            shippingAddress: {
                address: '',
                city: '',
                postalCode: '',
                country: ''
            },
            orderItems: [{ id: 0, qty: 0, product: { _id: 0, name: '', image: '', description: '', brand: '', category: '', countInStock: 0, rating: 0, numReviews: 0, price: 0 } }]
        },
        refund: {
            id: 0,
            isAccepted: false,
            isReviewed: false,
            order: 0,
            requestedAt: null,
            storeResponse: null,
            stripeUser: 0,
            userComment: null
        }
    }
}

const OrderDetailsReducer = (
    state: any = initialState,
    action: Action
): SampleReducer => {
    switch (action.type) {
        case ActionType.GET_ORDER_DETAILS:
            return { loading: true }
        case ActionType.GET_ORDER_DETAILS_SUCCESS:
            return { data: action.payload }
        case ActionType.GET_ORDER_DETAILS_ERROR:
            return { error: action.payload }
        default:
            return state;
    }
};

export default OrderDetailsReducer;