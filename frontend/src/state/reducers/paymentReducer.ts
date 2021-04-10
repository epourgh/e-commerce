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

const PaymentReducer = (
    state: any = initialState,
    action: Action
): SampleReducer => {
    switch (action.type) {
        case ActionType.PUT_PAYMENT:
            return { loading: true, success: false }
        case ActionType.PUT_PAYMENT_SUCCESS:
            return { loading: false, success: true }
        case ActionType.PUT_PAYMENT_ERROR:
            return { loading: false, success: false, error: action.payload }
        default:
            return state;
    }
};

export default PaymentReducer;