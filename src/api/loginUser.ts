import axios from 'axios';
import { IAuthRequest, ILoginResponse, IRequestError } from '../types/apiTypes';

import { api, apiSetHeader } from './api';

export const authUser = async (request: IAuthRequest) => {
    try {
        const { data, status } = await api.post<ILoginResponse>('auth/login', request);

        apiSetHeader('Authorization', `Bearer ${data.accessToken}`);

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
