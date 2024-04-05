import { IGetTrainingsResponse } from '../types/apiTypes';

import { api, apiSetHeader, handleError } from './api';

export const getTrainingInfo = async (accessToken: string) => {
    apiSetHeader('Authorization', `Bearer ${accessToken}`);

    try {
        const { data, status } = await api.get<IGetTrainingsResponse[]>('training');

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
