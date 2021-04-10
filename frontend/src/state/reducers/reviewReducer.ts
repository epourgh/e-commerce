import { Action } from '../actions/index'
import { ActionType } from '../action-types/index'

interface SampleReducer {
    loading?: boolean;
    error?: string | null;
    success?: boolean;
    checkIfUserReviewed?: string
}

const initialState = {
    loading: false,
    error: null,
    success: false,
    checkIfUserReviewed: 'initial state'
}

const ReviewReducer = (
    state: any = initialState,
    action: Action
): SampleReducer => {
    switch (action.type) {
        case ActionType.POST_REVIEW:
            return { loading: true, success: false }
        case ActionType.POST_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case ActionType.POST_REVIEW_ERROR:
            return { loading: false, success: false, error: action.payload }
        case ActionType.CHECK_IF_REVIEWED:
            return { loading: true, success: false, checkIfUserReviewed: 'checking' }
        case ActionType.CHECK_IF_REVIEWED_SUCCESS:
            return { loading: false, success: true, checkIfUserReviewed: action.payload }
        case ActionType.CHECK_IF_REVIEWED_ERROR:
            return { loading: false, success: false, error: action.payload, checkIfUserReviewed: 'did not retrieve' }
        default:
            return state;
    }
};

export default ReviewReducer;