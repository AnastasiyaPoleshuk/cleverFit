import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkEmail } from '../../api/checkEmail';
import { IChangePasswordRequest, IConfirmEmailRequest } from '../../types/apiTypes';
import { confirmEmail } from '../../api/confirmEmail';
import { changePassword } from '../../api/changePassword';

export const CheckEmailThunk = createAsyncThunk(
    'changePassword/checkEmail',
    async (request: { email: string }) => {
        const response = await checkEmail(request);
        return response;
    },
);

export const ConfirmEmailThunk = createAsyncThunk(
    'changePassword/confirmEmail',
    async (request: IConfirmEmailRequest) => {
        const response = await confirmEmail(request);
        return response;
    },
);

export const ChangePasswordThunk = createAsyncThunk(
    'changePassword/changePassword',
    async (request: IChangePasswordRequest) => {
        const response = await changePassword(request);
        return response;
    },
);
