import CONSTANTS from '@utils/constants';
import { ICreateInviteResponse, IUpdateInviteStatusRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const updateInviteStatus = async (request: IUpdateInviteStatusRequest) => {
    try {
        const { data, status } = await api.put<ICreateInviteResponse>(
            CONSTANTS.API_URLS.INVITE,
            request,
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
