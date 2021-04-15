import { Action } from '../actions/index'
import { ActionType } from '../action-types/index'

interface SampleReducer {
    loading?: boolean;
    error?: string | null;
    success?: boolean;
    all?: any,
    productPage?: any
}

const initialState = {
    loading: false,
    error: null,
    success: false,
    all: [],
    productPage: {}
}

const FavoriteReducer = (
    state: any = initialState,
    action: Action
): SampleReducer => {
    switch (action.type) {
        case ActionType.POST_FAVORITE:
            return { loading: true }
        case ActionType.POST_FAVORITE_SUCCESS:
            return { success: true }
        case ActionType.POST_FAVORITE_ERROR:
            return { error: action.payload }
        case ActionType.DELETE_FAVORITE:
            return { loading: true }
        case ActionType.DELETE_FAVORITE_SUCCESS:
            return { success: true }
        case ActionType.DELETE_FAVORITE_ERROR:
            return { error: action.payload }
        case ActionType.GET_FAVORITES:
            return { loading: true }
        case ActionType.GET_FAVORITES_SUCCESS:
            return { success: true, all: action.payload.data, isEndOfFeed: action.payload.isEndOfFeed }
        case ActionType.GET_FAVORITES_ERROR:
            return { error: action.payload }
        case ActionType.GET_FAVORITE_BY_ID:
            return { loading: true }
        case ActionType.GET_FAVORITE_BY_ID_SUCCESS:
            return { success: true, productPage: action.payload }
        case ActionType.GET_FAVORITE_BY_ID_ERROR:
            return { error: action.payload }
        default:
            return state;
    }
};

export default FavoriteReducer;