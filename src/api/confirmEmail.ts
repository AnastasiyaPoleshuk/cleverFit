import { ICheckEmailResponse, IConfirmEmailRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const confirmEmail = async (request: IConfirmEmailRequest) => {
    try {
        const { data, status } = await api.post<ICheckEmailResponse>(
            'auth/confirm-email',
            request,
            { withCredentials: true },
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
