import { IAuthRequest, ILoginResponse } from '../types/apiTypes';

import { api, apiSetHeader, handleError } from './api';

export const authUser = async (request: IAuthRequest) => {
    try {
        const { data, status } = await api.post<ILoginResponse>('auth/login', request);

        apiSetHeader('Authorization', `Bearer ${data.accessToken}`);

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
