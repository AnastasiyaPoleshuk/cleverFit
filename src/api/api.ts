import axios from 'axios';

import CONSTANTS from '../utils/constants';

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
