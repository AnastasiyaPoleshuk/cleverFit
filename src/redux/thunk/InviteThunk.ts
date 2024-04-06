import { createAsyncThunk } from '@reduxjs/toolkit';
import { getInvites } from '../../api/getinvites';
import { createInvite } from '../../api/createInvite';
import { ICreateInviteRequest, IUpdateInviteStatusRequest } from '../../types/apiTypes';
import { updateInviteStatus } from '../../api/updateInviteStatus';
import { removeInvite } from 'src/api/removeInvite';

export const GetInvitesThunk = createAsyncThunk('training/getInvites', async () => {
    const response = await getInvites();
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
