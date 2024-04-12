import CONSTANTS from '@utils/constants';
import { IAuthRequest, ILoginResponse } from '../types/apiTypes';

import { api, apiSetHeader, handleError } from './api';

export const authUser = async (request: IAuthRequest) => {
    try {
        const { data, status } = await api.post<ILoginResponse>(CONSTANTS.API_URLS.LOGIN, request);

        apiSetHeader('Authorization', `Bearer ${data.accessToken}`);

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
