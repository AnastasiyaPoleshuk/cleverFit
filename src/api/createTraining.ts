import { IGetTrainingsResponse, ICreateTrainingRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const createTraining = async (request: ICreateTrainingRequest) => {
    try {
        const { data, status } = await api.post<IGetTrainingsResponse>('training', request);

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
