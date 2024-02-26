import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthRequest } from '../../types/apiTypes';
import { authUser } from '../../api/loginUser';
import { registerUser } from '../../api/registerUser';

export const LoginUserThunk = createAsyncThunk('user/loginUser', async (request: IAuthRequest) => {
    const response = await authUser(request);
    return response;
});

export const RegisterUserThunk = createAsyncThunk(
    'user/registerUser',
    async (request: IAuthRequest) => {
        const response = await registerUser(request);
        return response;
    },
);
