import axios from 'axios';
import { IChangePasswordRequest, IRequestError } from '../types/apiTypes';

import { api } from './api';

export const changePassword = async (request: IChangePasswordRequest) => {
    try {
        const { data, status } = await api.post<{ message: string }>(
            'auth/change-password',
            request,
        );

        return { data, status };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                data: error.response?.data,
                status: error.response?.status,
            };
        }

        const requestError = error as IRequestError;
        return { data: requestError, status: requestError.statusCode };
    }
};
