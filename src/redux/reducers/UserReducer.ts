import {
    AUTH_USER,
    IS_REGISTRATION_SUCCESS,
    IS_AUTH,
    CHECK_EMAIL,
    CONFIRM_EMAIL,
    CHANGE_PASSWORD,
} from '../actionTypes';
import initialState, { IInitialState } from '../initialState';

interface IAction {
    type: string;
    payload?: any;
}

export const UserReducer = (state = initialState as IInitialState, action: IAction) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                token: action.payload?.accessToken,
            };
        case IS_REGISTRATION_SUCCESS:
            return {
                ...state,
                isRegisterSuccess: action.payload,
            };
        case IS_AUTH:
            return {
                ...state,
                isAuth: action.payload,
            };
        case CHECK_EMAIL:
            return {
                ...state,
                email: action.payload.email,
                isCheckEmailSuccess: true,
            };
        case CONFIRM_EMAIL:
            return {
                ...state,
                IsConfirmEmailSuccess: action.payload,
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                IsChangePasswordSuccess: true,
                changePassword: action.payload,
            };
        default:
            return state;
    }
};
