import { IGetInviteResponse } from '../types/apiTypes';

import { api, handleError } from './api';

export const getInvites = async () => {
    try {
        const { data, status } = await api.get<IGetInviteResponse[]>('invite');

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
