import { Action } from '../actions/index'
import { ActionType } from '../action-types/index'
import { ShopList } from '../data-types/index';

interface SampleReducer {
    loading: boolean;
    error: string | null;
    data: ShopList[];
}

const initialState = {
    loading: false,
    error: null,
    data: []
}

const ProductListReducer = (
    state: SampleReducer = initialState,
    action: Action
): SampleReducer => {
    switch (action.type) {
        case ActionType.GET_PRODUCT_LIST:
            return { loading: true, error: null, data: [] }
        case ActionType.GET_PRODUCT_LIST_SUCCESS:
            return { loading: false, error: null, data: action.payload }
        case ActionType.GET_PRODUCT_LIST_ERROR:
            return { loading: false, error: action.payload, data: [] }
        case ActionType.GET_PRODUCT_LIST_BY_ID:
            return { loading: true, error: null, data: [] }
        case ActionType.GET_PRODUCT_LIST_BY_ID_SUCCESS:
            return { loading: false, error: null, data: action.payload }
        case ActionType.GET_PRODUCT_LIST_BY_ID_ERROR:
            return { loading: false, error: action.payload, data: [] }
        default:
            return state;
    }
};

export default ProductListReducer;