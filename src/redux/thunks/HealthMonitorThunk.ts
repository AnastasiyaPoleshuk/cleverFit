import StatusCodes from 'http-status-codes';

import { healthMonitor } from '../../api/healthmonitor';
import { IRequestError } from '../../types/apiTypes';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';
import { AppDispatch } from '@redux/configure-store';
import { HealthMonitorAction } from '@redux/actions/HealthMonitorAction';

export const HealthMonitorThunk = () =>
    async function (dispatch: AppDispatch) {
        dispatch(LoadingAction(true));

        const response: { data: string | IRequestError; status: number } = await healthMonitor();

        if (response.status === StatusCodes.OK) {
            dispatch(HealthMonitorAction(true));
        } else {
            dispatch(ErrorAction(response.data as IRequestError));
            dispatch(HealthMonitorAction(false));
        }
        dispatch(LoadingAction(false));
    };
