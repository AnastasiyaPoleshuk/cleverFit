import { IGetTrainingPalsResponse } from '../types/apiTypes';

import { api, apiSetHeader, handleError } from './api';

export const getUsersForJoinTraining = async (request: {
    trainingType: string;
    accessToken: string;
}) => {
    try {
        apiSetHeader('Authorization', `Bearer ${request.accessToken}`);

        const { data, status } = await api.get<IGetTrainingPalsResponse[]>(
            request.trainingType
                ? `catalogs/user-joint-training-list?trainingType=${request.trainingType}`
                : 'catalogs/user-joint-training-list',
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
