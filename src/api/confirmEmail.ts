import CONSTANTS from '@utils/constants';
import { ICheckEmailResponse, IConfirmEmailRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const confirmEmail = async (request: IConfirmEmailRequest) => {
    try {
        const { data, status } = await api.post<ICheckEmailResponse>(
            CONSTANTS.API_URLS.CONFIRM_EMAIL,
            request,
            { withCredentials: true },
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
