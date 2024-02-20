import axios from 'axios';
import { ICheckEmailResponse, IRequestError } from '../types/apiTypes';

import { api } from './api';

export const checkEmail = async (request: { email: string }) => {
    try {
        const { data, status } = await api.post<ICheckEmailResponse>('auth/check-email', request);

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
