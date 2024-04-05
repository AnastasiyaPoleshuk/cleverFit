import { ITariffListResponse } from '../types/apiTypes';

import { api, handleError } from './api';

export const getTariff = async () => {
    try {
        const { data, status } = await api.get<ITariffListResponse[]>('catalogs/tariff-list');

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
