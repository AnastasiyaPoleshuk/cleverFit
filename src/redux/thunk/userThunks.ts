import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthRequest, IPostTariffRequest, IUpdateUser } from '../../types/apiTypes';
import { authUser } from '../../api/loginUser';
import { registerUser } from '../../api/registerUser';
import { getUser } from '../../api/getUser';
import { updateUser } from '../../api/updateUser';
import { uploadAvatar } from '../../api/uploadAvatar';
import { getTariff } from '../../api/getTariff';
import { postTariff } from '../../api/postTariff';

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

export const GetUserThunk = createAsyncThunk('user/getUser', async (token: string) => {
    const response = await getUser(token);
    return response;
});

export const UpdateUserThunk = createAsyncThunk('user/updateUser', async (request: IUpdateUser) => {
    const response = await updateUser(request);
    return response;
});

export const UploadAvatarThunk = createAsyncThunk(
    'user/uploadAvatar',
    async (request: { token: string; file: FormData }) => {
        const response = await uploadAvatar(request);
        return response;
    },
);

export const GetTariffListThunk = createAsyncThunk('user/uploaDAvatar', async () => {
    const response = await getTariff();
    return response;
});

export const PostTariffThunk = createAsyncThunk(
    'user/postTariff',
    async (request: IPostTariffRequest) => {
        const response = await postTariff(request);
        return response;
    },
);
