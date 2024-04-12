import CONSTANTS from '@utils/constants';
import { IPostTariffRequest } from '../types/apiTypes';

import { api, handleError } from './api';

export const postTariff = async (request: IPostTariffRequest) => {
    try {
        const { data, status } = await api.post<object>(CONSTANTS.API_URLS.TARIFF, request);
        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
