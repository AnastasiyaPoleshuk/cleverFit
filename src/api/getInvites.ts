import { IGetInviteResponse } from '../types/apiTypes';

import { api, apiSetHeader, handleError } from './api';

export const getInvites = async (token: string) => {
    try {
        apiSetHeader('Authorization', `Bearer ${token}`);

        const { data, status } = await api.get<IGetInviteResponse[]>('invite');

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
