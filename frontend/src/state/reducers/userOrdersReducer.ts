import { Action } from '../actions/index'
import { ActionType } from '../action-types/index'
import { SampleOrderReducer } from '../data-types/index';

interface SampleReducer {
    loading?: boolean;
    error?: string | null;
    data?: SampleOrderReducer;
}

const initialState = [{
    loading: false,
    error: null,
    data: {
        createdAt: '',
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
    }
}]

const UserOrdersReducer = (
    state: any = initialState,
    action: Action
): SampleReducer => {
    switch (action.type) {
        case ActionType.GET_USER_ORDERS:
            return { loading: true }
        case ActionType.GET_USER_ORDERS_SUCCESS:
            return { data: action.payload }
        case ActionType.GET_USER_ORDERS_ERROR:
            return { error: action.payload }
        default:
            return state;
    }
};

export default UserOrdersReducer;