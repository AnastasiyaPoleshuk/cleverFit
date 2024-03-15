import axios from 'axios';
import { IGetTrainingsResponse, IRequestError } from '../types/apiTypes';

import { api, apiSetHeader } from './api';

export const getTrainingInfo = async (accessToken: string) => {
    apiSetHeader('Authorization', `Bearer ${accessToken}`);

    try {
        const { data, status } = await api.get<IGetTrainingsResponse[]>('training');

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
