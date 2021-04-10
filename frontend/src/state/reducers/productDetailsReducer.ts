import { Action } from '../actions/index'
import { ActionType } from '../action-types/index'
import { ShopList } from '../data-types/index';

interface SampleReducer {
    loading: boolean;
    error: string | null;
    data: ShopList;
}

const emptyItemDetailsPayload = {
    _id: 0,
    name: '',
    image: '',
    description: '',
    brand: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    token: '',
    reviews: []
};

const initialState = {
    loading: false,
    error: null,
    data: emptyItemDetailsPayload
}

const ProductDetailsReducer = (
    state: SampleReducer = initialState,
    action: Action
): SampleReducer => {
    switch (action.type) {
        case ActionType.GET_PRODUCT_DETAILS:
            return { loading: true, error: null, data: emptyItemDetailsPayload }
        case ActionType.GET_PRODUCT_DETAILS_SUCCESS:
            return { loading: false, error: null, data: action.payload }
        case ActionType.GET_PRODUCT_DETAILS_ERROR:
            return { loading: false, error: action.payload, data: emptyItemDetailsPayload }
        default:
            return state;
    }
};

export default ProductDetailsReducer;