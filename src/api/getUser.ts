import CONSTANTS from '@utils/constants';
import { IUser } from '../types/apiTypes';

import { api, apiSetHeader, handleError } from './api';

export const getUser = async (token: string) => {
    try {
        apiSetHeader('Authorization', `Bearer ${token}`);

        const { data, status } = await api.get<IUser>(CONSTANTS.API_URLS.USER_ME);

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
