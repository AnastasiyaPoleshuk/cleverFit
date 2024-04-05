import { IGetTrainingListResponse } from '../types/apiTypes';

import { api, handleError } from './api';

export const getTrainingList = async () => {
    try {
        const { data, status } = await api.get<IGetTrainingListResponse[]>(
            'catalogs/training-list',
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
