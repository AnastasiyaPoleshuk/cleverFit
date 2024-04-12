import CONSTANTS from '@utils/constants';
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
                ? `${CONSTANTS.API_URLS.USERS_JOINT_TRAINING_LIST}?trainingType=${request.trainingType}`
                : CONSTANTS.API_URLS.USERS_JOINT_TRAINING_LIST,
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
