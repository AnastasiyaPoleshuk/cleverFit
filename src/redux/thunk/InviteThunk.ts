import { createAsyncThunk } from '@reduxjs/toolkit';
import { getInvites } from '../../api/getInvites';
import { createInvite } from '../../api/createInvite';
import { ICreateInviteRequest, IUpdateInviteStatusRequest } from '../../types/apiTypes';
import { updateInviteStatus } from '../../api/updateInviteStatus';
import { removeInvite } from '../../api/removeInvite';

export const GetInvitesThunk = createAsyncThunk('training/getInvites', async (token: string) => {
    const response = await getInvites(token);
    return response;
});

export const CreateInvitesThunk = createAsyncThunk(
    'training/createInvites',
    async (request: ICreateInviteRequest) => {
        const response = await createInvite(request);
        return response;
    },
);

export const UpdateInvitesThunk = createAsyncThunk(
    'training/updateInviteStatus',
    async (request: IUpdateInviteStatusRequest) => {
        const response = await updateInviteStatus(request);
        return response;
    },
);

export const RemoveInviteThunk = createAsyncThunk(
    'training/removeInvite',
    async (request: string) => {
        const response = await removeInvite(request);
        return response;
    },
);
