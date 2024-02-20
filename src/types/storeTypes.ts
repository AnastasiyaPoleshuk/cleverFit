import { IRequestError } from './apiTypes';

export interface IStore {
    isAuth: {
        isAuth: boolean;
    };
    isRegisterSuccess: boolean;
    isLoading: {
        isLoading: boolean;
    };
    isError: {
        isError: boolean;
    };
    token: {
        token: string;
    };
    requestError: {
        requestError: IRequestError;
    };
}
