import CONSTANTS from '@utils/constants';
import { IChangePasswordRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const changePassword = async (request: IChangePasswordRequest) => {
    try {
        const { data, status } = await api.post<{ message: string }>(
            CONSTANTS.API_URLS.CHANGE_PASSWORD,
            request,
            { withCredentials: true },
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
