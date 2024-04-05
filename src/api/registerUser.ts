import { IAuthRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const registerUser = async (request: IAuthRequest) => {
    try {
        const { data, status } = await api.post<object>('auth/registration', {
            email: request.email,
            password: request.password,
        });
        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
