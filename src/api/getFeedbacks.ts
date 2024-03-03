import axios from 'axios';
import { IFeedbacks, IRequestError } from '../types/apiTypes';

import { api, apiSetHeader } from './api';

export const getFeedbacks = async (token: string) => {
    apiSetHeader('Authorization', `Bearer ${token}`);

    try {
        const { data, status } = await api.get<IFeedbacks[]>('feedback');

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
