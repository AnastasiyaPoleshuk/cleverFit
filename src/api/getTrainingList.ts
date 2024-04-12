import CONSTANTS from '@utils/constants';
import { IGetTrainingListResponse } from '../types/apiTypes';

import { api, handleError } from './api';

export const getTrainingList = async () => {
    try {
        const { data, status } = await api.get<IGetTrainingListResponse[]>(
            CONSTANTS.API_URLS.TRAINING_LIST,
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
