import axios from 'axios';
import { ICheckEmailResponse, IConfirmEmailRequest, IRequestError } from '../types/apiTypes';

import { api } from './api';

export const confirmEmail = async (request: IConfirmEmailRequest) => {
    try {
        const { data, status } = await api.post<ICheckEmailResponse>('auth/confirm-email', request);

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
