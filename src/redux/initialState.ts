import { IChangePasswordRequest } from '../types/apiTypes';

export interface IInitialState {
    isAuth: boolean;
    isRegisterSuccess: boolean;
    isCheckEmailSuccess: boolean;
    IsConfirmEmailSuccess: boolean;
    IsChangePasswordSuccess: boolean;
    token: string;
    email: string;
    changePassword: IChangePasswordRequest;
}
const initialState: IInitialState = {
    isAuth: false,
    isRegisterSuccess: false,
    isCheckEmailSuccess: false,
    IsConfirmEmailSuccess: false,
    IsChangePasswordSuccess: false,
    token: '',
    email: '',
    changePassword: {
        password: '',
        confirmPassword: '',
    },
};

export default initialState;
