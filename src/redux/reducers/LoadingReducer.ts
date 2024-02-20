import { IS_LOADING } from '../actionTypes';

interface IAction {
    type: string;
    payload?: any;
}

export const LoadingReducer = (state = { isLoading: false }, action: IAction) => {
    switch (action.type) {
        case IS_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};
