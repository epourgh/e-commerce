import { Action } from '../actions/index'
import { ActionType } from '../action-types/index'

interface SampleReducer {
    loading?: boolean;
    error?: string | null;
    success?: boolean;
}

const initialState = {
    loading: false,
    error: null,
    success: false
}

const RefundReducer = (
    state: any = initialState,
    action: Action
): SampleReducer => {
    switch (action.type) {
        case ActionType.POST_REFUND:
            return { loading: true }
        case ActionType.POST_REFUND_SUCCESS:
            return { success: true }
        case ActionType.POST_REFUND_ERROR:
            return { error: action.payload }
        default:
            return state;
    }
};

export default RefundReducer;