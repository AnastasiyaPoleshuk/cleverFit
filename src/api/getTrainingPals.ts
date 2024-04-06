import { IGetTrainingPalsResponse } from '../types/apiTypes';

import { api, handleError } from './api';

export const getTrainingPals = async () => {
    try {
        const { data, status } = await api.get<IGetTrainingPalsResponse[]>(
            'catalogs/training-pals',
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
