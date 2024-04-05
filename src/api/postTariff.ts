import { IPostTariffRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const postTariff = async (request: IPostTariffRequest) => {
    try {
        const { data, status } = await api.post<object>('tariff', request);
        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
