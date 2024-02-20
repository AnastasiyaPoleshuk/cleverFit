import { IS_ERROR, ERROR } from '../actionTypes';

export const ErrorReducer = (state = { isError: false, requestError: {} }, action: any) => {
    switch (action.type) {
        case IS_ERROR:
            return {
                ...state,
                isError: action.payload,
            };
        case ERROR:
            return {
                ...state,
                requestError: action.payload,
                isError: true,
            };
        default:
            return state;
    }
};
