import { IChangePasswordRequest, ICheckEmailResponse, ILoginResponse } from '../../types/apiTypes';
import {
    CHECK_EMAIL,
    AUTH_USER,
    IS_AUTH,
    IS_REGISTRATION_SUCCESS,
    CONFIRM_EMAIL,
    CHANGE_PASSWORD,
} from '../actionTypes';

export const IsAuthAction = (payload: boolean) => ({ type: IS_AUTH, payload });

export const LoginAction = (payload: ILoginResponse) => ({ type: AUTH_USER, payload });

export const RegisterAction = (payload: boolean) => ({ type: IS_REGISTRATION_SUCCESS, payload });

export const CheckEmailAction = (payload: ICheckEmailResponse) => ({ type: CHECK_EMAIL, payload });

export const ConfirmEmailAction = (payload: boolean) => ({ type: CONFIRM_EMAIL, payload });

export const ChangePasswordAction = (payload: IChangePasswordRequest) => ({
    type: CHANGE_PASSWORD,
    payload,
});
