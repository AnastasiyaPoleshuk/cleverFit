import StatusCodes from 'http-status-codes';

import { authUser } from '../../api/loginUser';
import { IAuthRequest, IRequestError, ILoginResponse } from '../../types/apiTypes';
import { LoginAction, IsAuthAction } from '../actions/AuthActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';
import { AppDispatch } from '@redux/configure-store';

export const LoginUserThunk = (requestData: IAuthRequest) =>
    async function (dispatch: AppDispatch) {
        dispatch(LoadingAction(true));

        const response: { data: ILoginResponse | IRequestError; status: number } = await authUser(
            requestData,
        );

        if (response.status === StatusCodes.OK) {
            dispatch(LoginAction(response.data as ILoginResponse));
            dispatch(IsAuthAction(true));
        } else {
            dispatch(ErrorAction(response.data as IRequestError));
            dispatch(IsAuthAction(false));
        }
        dispatch(LoadingAction(false));
    };
