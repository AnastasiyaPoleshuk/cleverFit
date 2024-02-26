import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IChangePasswordRequest, IRequestError } from '../../types/apiTypes';
import { ConfirmEmailThunk } from '../thunk/changePasswordThunks';
import { CheckEmailThunk } from '../thunk/changePasswordThunks';
import { ChangePasswordThunk } from '../thunk/changePasswordThunks';

interface IInitialState {
    isLoading: boolean;
    isCheckEmailSuccess: boolean;
    isConfirmEmailSuccess: boolean;
    isChangePasswordSuccess: boolean;
    isCheckEmailError: boolean;
    isConfirmEmailError: boolean;
    isChangePasswordError: boolean;
    email: string;
    changePassword: IChangePasswordRequest;
    error: IRequestError;
}

const initialState: IInitialState = {
    isLoading: false,
    isCheckEmailSuccess: false,
    isConfirmEmailSuccess: false,
    isChangePasswordSuccess: false,
    isCheckEmailError: false,
    isConfirmEmailError: false,
    isChangePasswordError: false,
    email: '',
    changePassword: {
        password: '',
        confirmPassword: '',
    },
    error: {
        statusCode: 0,
        error: '',
        message: '',
    },
};

const changePasswordSlice = createSlice({
    name: 'changePassword',
    initialState,
    reducers: {
        checkEmailErrorState: (state, action: PayloadAction<boolean>) => {
            state.isCheckEmailError = action.payload;
        },
        checkEmailSuccessState: (state, action: PayloadAction<boolean>) => {
            state.isCheckEmailSuccess = action.payload;
        },
        confirmEmailErrorState: (state, action: PayloadAction<boolean>) => {
            state.isConfirmEmailError = action.payload;
        },
        changePasswordErrorState: (state, action: PayloadAction<boolean>) => {
            state.isChangePasswordError = action.payload;
        },
        addChangePasswordData: (state, action: PayloadAction<IChangePasswordRequest>) => {
            state.changePassword = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(CheckEmailThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CheckEmailThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isCheckEmailError = false;
                state.isCheckEmailSuccess = true;

                state.email = action.payload.data.email;
            })
            .addCase(CheckEmailThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isCheckEmailError = true;
                state.isCheckEmailSuccess = false;

                state.error = JSON.parse(action.error.message as string);
            });

        builder
            .addCase(ConfirmEmailThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(ConfirmEmailThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.isConfirmEmailError = false;
                state.isConfirmEmailSuccess = true;
            })
            .addCase(ConfirmEmailThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isConfirmEmailError = true;
                state.isConfirmEmailSuccess = false;

                state.error = JSON.parse(action.error.message as string);
            });

        builder
            .addCase(ChangePasswordThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(ChangePasswordThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.isChangePasswordError = false;
                state.isChangePasswordSuccess = true;
            })
            .addCase(ChangePasswordThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isChangePasswordError = true;
                state.isChangePasswordSuccess = false;

                state.error = JSON.parse(action.error.message as string);
            });
    },
});

export const {
    checkEmailErrorState,
    confirmEmailErrorState,
    changePasswordErrorState,
    addChangePasswordData,
    checkEmailSuccessState,
} = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
