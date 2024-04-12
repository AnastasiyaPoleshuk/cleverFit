import CONSTANTS from '@utils/constants';
import { IFeedbacks } from '../types/apiTypes';

import { api, apiSetHeader, handleError } from './api';

export const getFeedbacks = async (token: string) => {
    apiSetHeader('Authorization', `Bearer ${token}`);

    try {
        const { data, status } = await api.get<IFeedbacks[]>(CONSTANTS.API_URLS.FEEDBACK);

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
