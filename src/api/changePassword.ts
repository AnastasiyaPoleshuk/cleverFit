import axios from 'axios';
import { IChangePasswordRequest, IRequestError } from '../types/apiTypes';

import { api } from './api';

export const changePassword = async (request: IChangePasswordRequest) => {
    try {
        const { data, status } = await api.post<{ message: string }>(
            'auth/change-password',
            request,
            { withCredentials: true },
        );

        return { data, status };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorString = JSON.stringify({
                statusCode: error.response?.status,
                error: error.response?.data.error || error.name,
                message: error.response?.data.message || error.message,
            });
            throw Error(errorString);
        }

        const requestError = error as IRequestError;
        const errorString = JSON.stringify(requestError);

        throw Error(errorString);
    }
};
