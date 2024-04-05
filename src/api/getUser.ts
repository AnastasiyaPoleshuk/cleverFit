import { IUser } from '../types/apiTypes';

import { api, apiSetHeader, handleError } from './api';

export const getUser = async (token: string) => {
    try {
        apiSetHeader('Authorization', `Bearer ${token}`);

        const { data, status } = await api.get<IUser>('user/me');

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
