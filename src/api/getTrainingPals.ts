import CONSTANTS from '@utils/constants';
import { IGetTrainingPalsResponse } from '../types/apiTypes';

import { api, handleError } from './api';

export const getTrainingPals = async () => {
    try {
        const { data, status } = await api.get<IGetTrainingPalsResponse[]>(
            CONSTANTS.API_URLS.TRAINING_PALS,
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
