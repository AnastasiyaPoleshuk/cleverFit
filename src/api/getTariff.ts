import CONSTANTS from '@utils/constants';
import { ITariffListResponse } from '../types/apiTypes';

import { api, handleError } from './api';

export const getTariff = async () => {
    try {
        const { data, status } = await api.get<ITariffListResponse[]>(
            CONSTANTS.API_URLS.TARIFF_LIST,
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
