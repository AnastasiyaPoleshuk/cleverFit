import CONSTANTS from '@utils/constants';
import { ICreateInviteResponse, ICreateInviteRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const createInvite = async (request: ICreateInviteRequest) => {
    try {
        const { data, status } = await api.post<ICreateInviteResponse>(
            CONSTANTS.API_URLS.INVITE,
            request,
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
