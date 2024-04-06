import { ICreateInviteResponse, IUpdateInviteStatusRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const updateInviteStatus = async (request: IUpdateInviteStatusRequest) => {
    try {
        const { data, status } = await api.put<ICreateInviteResponse>('invite', request);

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
