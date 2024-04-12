import CONSTANTS from '@utils/constants';
import { IGetTrainingsResponse } from '../types/apiTypes';

import { api, apiSetHeader, handleError } from './api';

export const getTrainingInfo = async (accessToken: string) => {
    apiSetHeader('Authorization', `Bearer ${accessToken}`);

    try {
        const { data, status } = await api.get<IGetTrainingsResponse[]>(
            CONSTANTS.API_URLS.TRAINING,
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
