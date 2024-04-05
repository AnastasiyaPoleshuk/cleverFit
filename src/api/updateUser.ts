import { IUpdateUser, IUser } from '../types/apiTypes';

import { api, handleError } from './api';

export const updateUser = async (request: IUpdateUser) => {
    try {
        const { data, status } = await api.put<IUser>('user', request);

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
