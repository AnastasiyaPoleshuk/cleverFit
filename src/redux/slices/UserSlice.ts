import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    IUser,
    IRequestError,
    IUploadAvatarResponse,
    ITariffListResponse,
} from '../../types/apiTypes';
import {
    GetTariffListThunk,
    GetUserThunk,
    LoginUserThunk,
    PostTariffThunk,
    UpdateUserThunk,
    UploadAvatarThunk,
} from '../thunk/userThunks';
import { RegisterUserThunk } from '../thunk/userThunks';

interface IInitialState {
    accessToken: string;
    isLoading: boolean;
    isAuth: boolean;
    isRegisterSuccess: boolean;
    error: IRequestError;
    isError: boolean;
    isRegisterError: boolean;
    user: IUser;
    avatarFile: IUploadAvatarResponse;
    tariff: ITariffListResponse[];
    isGetUserError: boolean;
    isGetUserSuccess: boolean;
    isUpdateUserError: boolean;
    isUpdateUserSuccess: boolean;
    isUploadAvatarError: boolean;
    isUploadAvatarSuccess: boolean;
    isGetTariffError: boolean;
    isGetTariffSuccess: boolean;
    isPostTariffError: boolean;
    isPostTariffSuccess: boolean;
}

const initialState: IInitialState = {
    accessToken: '',
    isLoading: false,
    isAuth: false,
    isRegisterSuccess: false,
    error: {
        statusCode: 0,
        error: '',
        message: '',
    },
    isError: false,
    isRegisterError: false,
    user: {
        email: '',
        firstName: '',
        lastName: '',
        birthday: '',
        imgSrc: '',
        readyForJointTraining: false,
        sendNotification: false,
        tariff: {
            tariffId: '',
            expired: '',
        },
    },
    avatarFile: {
        name: '',
        url: '',
    },
    tariff: [],
    isGetUserError: false,
    isGetUserSuccess: false,
    isUpdateUserError: false,
    isUpdateUserSuccess: false,
    isUploadAvatarError: false,
    isUploadAvatarSuccess: false,
    isGetTariffError: false,
    isGetTariffSuccess: false,
    isPostTariffError: false,
    isPostTariffSuccess: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeErrorState: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        changeRegisterErrorState: (state, action: PayloadAction<boolean>) => {
            state.isRegisterError = action.payload;
        },
        changeAuthState: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        changeIsPostTariffSuccessState: (state, action: PayloadAction<boolean>) => {
            state.isPostTariffSuccess = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(LoginUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isAuth = true;

                state.accessToken = action.payload.data.accessToken;
            })
            .addCase(LoginUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isAuth = false;

                state.error = JSON.parse(action.error.message as string);
            });

        builder
            .addCase(RegisterUserThunk.pending, (state) => {
                state.isLoading = true;
                state.isRegisterError = false;
                state.isRegisterSuccess = false;
            })
            .addCase(RegisterUserThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.isRegisterError = false;
                state.isRegisterSuccess = true;
            })
            .addCase(RegisterUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isRegisterError = true;
                state.isAuth = false;

                state.error = JSON.parse(action.error.message as string);
            });
        builder
            .addCase(GetUserThunk.fulfilled, (state, action) => {
                state.isGetUserError = false;
                state.isGetUserSuccess = true;

                state.user = action.payload.data;
            })
            .addCase(GetUserThunk.rejected, (state, action) => {
                state.isGetUserError = true;
                state.isGetUserSuccess = false;

                state.error = JSON.parse(action.error.message as string);
            });
        builder
            .addCase(UpdateUserThunk.fulfilled, (state, action) => {
                state.isUpdateUserError = false;
                state.isUpdateUserSuccess = true;

                state.user = action.payload.data;
            })
            .addCase(UpdateUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isUpdateUserError = true;
                state.isUpdateUserSuccess = false;

                state.error = JSON.parse(action.error.message as string);
            });
        builder
            .addCase(UploadAvatarThunk.pending, (state) => {
                state.isLoading = true;
                state.isUploadAvatarError = false;
                state.isUploadAvatarSuccess = false;
            })
            .addCase(UploadAvatarThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isUploadAvatarError = false;
                state.isUploadAvatarSuccess = true;

                state.avatarFile = action.payload.data;
                state.user.imgSrc = action.payload.data.url;
            })
            .addCase(UploadAvatarThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isUploadAvatarError = true;
                state.isUploadAvatarSuccess = false;

                state.error = JSON.parse(action.error.message as string);
            });
        builder
            .addCase(GetTariffListThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetTariffListThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isGetTariffError = false;
                state.isGetTariffSuccess = true;

                state.tariff = action.payload.data;
            })
            .addCase(GetTariffListThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isGetTariffError = true;
                state.isGetTariffSuccess = false;

                state.error = JSON.parse(action.error.message as string);
            });
        builder
            .addCase(PostTariffThunk.pending, (state) => {
                state.isLoading = true;
                state.isPostTariffError = false;
                state.isPostTariffSuccess = false;
            })
            .addCase(PostTariffThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.isPostTariffError = false;
                state.isPostTariffSuccess = true;
            })
            .addCase(PostTariffThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isPostTariffError = true;
                state.isPostTariffSuccess = false;

                state.error = JSON.parse(action.error.message as string);
            });
    },
});

export const {
    changeErrorState,
    changeRegisterErrorState,
    changeAuthState,
    setToken,
    changeIsPostTariffSuccessState,
} = userSlice.actions;

export default userSlice.reducer;
