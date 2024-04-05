import { IChangePasswordRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const changePassword = async (request: IChangePasswordRequest) => {
    try {
        const { data, status } = await api.post<{ message: string }>(
            'auth/change-password',
            request,
            { withCredentials: true },
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
