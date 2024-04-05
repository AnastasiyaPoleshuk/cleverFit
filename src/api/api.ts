import axios from 'axios';

import CONSTANTS from '../utils/constants';
import { IRequestError } from '../types/apiTypes';

export const api = axios.create({
    baseURL: CONSTANTS.URL,
});

export const apiSetHeader = (name: string, value: string) => {
    if (value) {
        api.defaults.headers[name] = value;
    }
};

export const apiSetContentTypeHeader = (value: string) => {
    if (value) {
        api.defaults.headers.common['Content-Type'] = value;
    }
};

export const apiRemoveContentTypeHeader = (value: string) => {
    if (value) {
        api.defaults.headers.common['Content-Type'] = value;
    }
};

export const handleError = (error: unknown) => {
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
};
