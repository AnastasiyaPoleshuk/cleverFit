import axios from 'axios';
import { IRequestError } from '../types/apiTypes';

import { api } from './api';

export const healthMonitor = async () => {
    try {
        const { data, status } = await api.get<string>('healthmonitor');

        return { data, status };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                data: error.response?.data,
                status: error.response?.status,
            };
        }

        const requestError = error as IRequestError;
        return { data: requestError, status: requestError.statusCode };
    }
};
