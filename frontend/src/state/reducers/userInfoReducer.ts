import { Action } from '../actions/index'
import { ActionType } from '../action-types/index'
import { UserInfo } from '../data-types/index';

interface SampleReducer {
    loading: boolean;
    error: string | null;
    success?: boolean | null;
    data: UserInfo;
}

const emptyUserPayload = { _id: 0, name: '', username: '', token: '' };

const initialState = {
    loading: false,
    error: null,
    data: emptyUserPayload
}

const UserInfoReducer = (
    state: SampleReducer = initialState,
    action: Action
): SampleReducer => {
    switch (action.type) {
        case ActionType.GET_USER_INFO:
            return { loading: true, error: null, data: emptyUserPayload }
        case ActionType.GET_USER_INFO_SUCCESS:
            return { loading: false, error: null, data: action.payload }
        case ActionType.GET_USER_INFO_ERROR:
            return { loading: false, error: action.payload, data: emptyUserPayload }
        case ActionType.POST_USER_REGISTRATION:
            return { loading: true, error: null, data: emptyUserPayload }
        case ActionType.POST_USER_REGISTRATION_SUCCESS:
            return { loading: false, error: null, data: action.payload }
        case ActionType.POST_USER_REGISTRATION_ERROR:
            return { loading: false, error: action.payload, data: emptyUserPayload }
        case ActionType.PUT_PROFILE:
            return { loading: true, error: null, data: emptyUserPayload }
        case ActionType.PUT_PROFILE_SUCCESS:
            return { loading: false, error: null, success: true, data: action.payload }
        case ActionType.PUT_PROFILE_ERROR:
            return { loading: false, error: action.payload, data: emptyUserPayload }
        case ActionType.USER_LOGOUT:
            return { loading: false, error: null, data: emptyUserPayload }
        default:
            return state;
    }
};
//POST_USER_REGISTRATION
export default UserInfoReducer;