import axios from 'axios';
import { IAuthRequest, IRequestError } from '../types/apiTypes';

import { api } from './api';

export const registerUser = async (request: IAuthRequest) => {
    try {
        const { data, status } = await api.post<object>('auth/registration', {
            email: request.email,
            password: request.password,
        });

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
