import CONSTANTS from '@utils/constants';
import { api, handleError } from './api';

export const removeInvite = async (inviteId: string) => {
    try {
        const { data, status } = await api.delete<object>(
            `${CONSTANTS.API_URLS.INVITE}/${inviteId}`,
        );

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
