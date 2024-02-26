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
