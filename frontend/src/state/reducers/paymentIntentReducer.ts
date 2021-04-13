import { Action } from '../actions/index'
import { ActionType } from '../action-types/index'

interface SampleReducer {
    loading?: boolean;
    error?: string | null;
    success?: boolean;
    paymentIntentId?: string;
    paymentMethodId?: string;
}

const initialState = {
    loading: false,
    error: null,
    success: false,
    client_secrete: ''
}

const PaymentIntentReducer = (
    state: any = initialState,
    action: Action
): SampleReducer => {
    switch (action.type) {
        case ActionType.POST_PAYMENT_INTENT:
            return { loading: true }
        case ActionType.POST_PAYMENT_INTENT_SUCCESS:
            return { success: true, paymentIntentId: action.payload.paymentIntentId, paymentMethodId: action.payload.paymentMethodId }
        case ActionType.POST_PAYMENT_INTENT_ERROR:
            return { error: action.payload }
        default:
            return state;
    }
};

export default PaymentIntentReducer;