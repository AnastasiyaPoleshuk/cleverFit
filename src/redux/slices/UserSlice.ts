import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRequestError } from '../../types/apiTypes';
import { LoginUserThunk } from '../thunk/userThunks';
import { RegisterUserThunk } from '../thunk/userThunks';

interface IInitialState {
    accessToken: string;
    isLoading: boolean;
    isAuth: boolean;
    isRegisterSuccess: boolean;
    error: IRequestError;
    isError: boolean;
    isRegisterError: boolean;
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
    },
});

export const { changeErrorState, changeRegisterErrorState, changeAuthState, setToken } =
    userSlice.actions;

export default userSlice.reducer;
