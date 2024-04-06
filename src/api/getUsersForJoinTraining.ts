import { IGetTrainingPalsResponse } from '../types/apiTypes';

import { api, handleError } from './api';

export const getUsersForJoinTraining = async () => {
    try {
        const { data, status } = await api.get<IGetTrainingPalsResponse[]>(
            'catalogs/user-joint-training-list',
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
