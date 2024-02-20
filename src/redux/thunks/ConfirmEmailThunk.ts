import StatusCodes from 'http-status-codes';

import { IConfirmEmailRequest, IConfirmEmailResponse, IRequestError } from '../../types/apiTypes';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';
import { AppDispatch } from '@redux/configure-store';
import { ConfirmEmailAction } from '@redux/actions/AuthActions';
import { confirmEmail } from '../../api/confirmEmail';

export const ConfirmEmailThunk = (request: IConfirmEmailRequest) =>
    async function (dispatch: AppDispatch) {
        dispatch(LoadingAction(true));

        const response: { data: IConfirmEmailResponse | IRequestError; status: number } =
            await confirmEmail(request);

        if (response.status === StatusCodes.OK) {
            dispatch(ConfirmEmailAction(true));
        } else {
            dispatch(ErrorAction(response.data as IRequestError));
            dispatch(ConfirmEmailAction(false));
        }
        dispatch(LoadingAction(false));
    };
