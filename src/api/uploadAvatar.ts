import CONSTANTS from '@utils/constants';
import { IUploadAvatarResponse } from '../types/apiTypes';

import {
    api,
    apiRemoveContentTypeHeader,
    apiSetContentTypeHeader,
    apiSetHeader,
    handleError,
} from './api';

export const uploadAvatar = async (request: { token: string; file: FormData }) => {
    try {
        apiSetHeader('Authorization', `Bearer ${request.token}`);
        apiSetContentTypeHeader('multipart/form-data');

        const { data, status } = await api.post<IUploadAvatarResponse>(
            CONSTANTS.API_URLS.UPLOAD_IMAGE,
            request.file,
        );

        apiRemoveContentTypeHeader('application/json');

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
