import CONSTANTS from '@utils/constants';
import { IGetTrainingsResponse, ICreateTrainingRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const updateTraining = async (request: ICreateTrainingRequest) => {
    try {
        const { data, status } = await api.put<IGetTrainingsResponse>(
            `${CONSTANTS.API_URLS.TRAINING}/${request._id}`,
            request,
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
