import { api, handleError } from './api';

export const removeInvite = async (inviteId: string) => {
    try {
        const { data, status } = await api.delete<object>(`invite/${inviteId}`);

        return { data, status };
    } catch (error) {
        handleError(error);
    }
};
