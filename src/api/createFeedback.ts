import CONSTANTS from '@utils/constants';
import { ICreateFeedbackRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const createFeedback = async (request: ICreateFeedbackRequest) => {
    try {
        const { data, status } = await api.post<object>(CONSTANTS.API_URLS.FEEDBACK, request);

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
