import axios from 'axios';
import { ICheckEmailResponse, IConfirmEmailRequest, IRequestError } from '../types/apiTypes';

import { api } from './api';

export const confirmEmail = async (request: IConfirmEmailRequest) => {
    try {
        const { data, status } = await api.post<ICheckEmailResponse>(
            'auth/confirm-email',
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
