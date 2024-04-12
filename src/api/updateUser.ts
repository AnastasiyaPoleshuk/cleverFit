import CONSTANTS from '@utils/constants';
import { IUpdateUser, IUser } from '../types/apiTypes';

import { api, handleError } from './api';

export const updateUser = async (request: IUpdateUser) => {
    try {
        const { data, status } = await api.put<IUser>(CONSTANTS.API_URLS.USER, request);

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
