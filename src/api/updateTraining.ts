import axios from 'axios';
import { IGetTrainingsResponse, IRequestError, ICreateTrainingRequest } from '../types/apiTypes';

import { api } from './api';

export const updateTraining = async (request: ICreateTrainingRequest) => {
    try {
        const { data, status } = await api.put<IGetTrainingsResponse>(
            'training/' + request._id,
            request,
        );

        return { data, status };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorString = JSON.stringify({
                statusCode: error.response?.status,
                error: error.response?.data.error || error.name,
                message: error.response?.data.message || error.message,
            });
            throw Error(errorString);
        }

        const requestError = error as IRequestError;
        const errorString = JSON.stringify(requestError);

        throw Error(errorString);
    }
};
