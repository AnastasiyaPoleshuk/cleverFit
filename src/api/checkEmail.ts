import CONSTANTS from '@utils/constants';
import { ICheckEmailResponse } from '../types/apiTypes';

import { api, handleError } from './api';

export const checkEmail = async (request: { email: string }) => {
    try {
        const { data, status } = await api.post<ICheckEmailResponse>(
            CONSTANTS.API_URLS.CHECK_EMAIL,
            request,
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
