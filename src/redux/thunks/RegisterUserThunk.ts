import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { registerUser } from '../../api/registerUser';
import { IAuthRequest, IRequestError } from '../../types/apiTypes';
import { RegisterAction } from '../actions/AuthActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const RegisterUserThunk = (requestData: IAuthRequest) =>
    async function (dispatch: Dispatch) {
        dispatch(LoadingAction(true));
        const response: { data: object | IRequestError; status: number } = await registerUser(
            requestData,
        );

        if (response.status === StatusCodes.CREATED) {
            dispatch(RegisterAction(true));
        } else {
            dispatch(ErrorAction(response.data as IRequestError));
            dispatch(RegisterAction(false));
        }
        dispatch(LoadingAction(false));
    };
8;
