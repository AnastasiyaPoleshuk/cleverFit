import axios from 'axios';
import { IUploadAvatarResponse, IRequestError } from '../types/apiTypes';

import { api, apiSetHeader } from './api';

export const uploadAvatar = async (request: { token: string; file: string }) => {
    try {
        apiSetHeader('Content-Type', 'multipart/form-data');
        apiSetHeader('Authorization', `Bearer ${request.token}`);

        const { data, status } = await api.post<IUploadAvatarResponse>(
            'upload-image',
            request.file,
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
