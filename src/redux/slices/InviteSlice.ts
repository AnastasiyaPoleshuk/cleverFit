import { createSlice } from '@reduxjs/toolkit';
import { ICreateInviteResponse, IGetInviteResponse, IRequestError } from '../../types/apiTypes';
import {
    CreateInvitesThunk,
    GetInvitesThunk,
    RemoveInviteThunk,
    UpdateInvitesThunk,
} from '@redux/thunk/InviteThunk';

interface IInitialState {
    myInvites: IGetInviteResponse[];
    createdInvite: ICreateInviteResponse;
    isLoading: boolean;
    error: IRequestError;
    isGetMyInvitesError: boolean;
    isGetMyInvitesSuccess: boolean;
    isCreatedInviteError: boolean;
    isCreatedInviteSuccess: boolean;
    isUpdateInviteStatusError: boolean;
    isUpdateInviteStatusSuccess: boolean;
    isRemoveInviteError: boolean;
    isRemoveInviteSuccess: boolean;
}

const initialState: IInitialState = {
    myInvites: [],
    createdInvite: {
        _id: '',
        from: {
            _id: '',
            firstName: '',
            lastName: '',
            imageSrc: '',
        },
        training: {},
        status: '',
        createdAt: '',
        to: {
            _id: '',
            firstName: '',
            lastName: '',
            imageSrc: '',
        },
    },
    isLoading: false,
    error: {
        statusCode: 0,
        error: '',
        message: '',
    },
    isGetMyInvitesError: false,
    isGetMyInvitesSuccess: false,
    isCreatedInviteError: false,
    isCreatedInviteSuccess: false,
    isUpdateInviteStatusError: false,
    isUpdateInviteStatusSuccess: false,
    isRemoveInviteError: false,
    isRemoveInviteSuccess: false,
};

const inviteSlice = createSlice({
    name: 'invite',
    initialState,
    reducers: {
        cleanError: (state) => {
            state.error = {
                statusCode: 0,
                error: '',
                message: '',
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetInvitesThunk.pending, (state) => {
                state.isLoading = true;
                state.isGetMyInvitesError = false;
                state.isGetMyInvitesSuccess = false;
            })
            .addCase(GetInvitesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isGetMyInvitesError = false;
                state.isGetMyInvitesSuccess = true;

                state.myInvites = action.payload.data;
            })
            .addCase(GetInvitesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isGetMyInvitesError = true;
                state.isGetMyInvitesSuccess = false;
                state.error = JSON.parse(action.error.message as string);
            });
        builder
            .addCase(CreateInvitesThunk.pending, (state) => {
                state.isLoading = true;
                state.isCreatedInviteError = false;
                state.isCreatedInviteSuccess = false;
            })
            .addCase(CreateInvitesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isCreatedInviteError = false;
                state.isCreatedInviteSuccess = true;

                state.createdInvite = action.payload.data;
            })
            .addCase(CreateInvitesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isCreatedInviteError = true;
                state.isCreatedInviteSuccess = false;
                state.error = JSON.parse(action.error.message as string);
            });
        builder
            .addCase(UpdateInvitesThunk.pending, (state) => {
                state.isLoading = true;
                state.isUpdateInviteStatusError = false;
                state.isUpdateInviteStatusSuccess = false;
            })
            .addCase(UpdateInvitesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isUpdateInviteStatusError = false;
                state.isUpdateInviteStatusSuccess = true;

                state.createdInvite = action.payload.data;
            })
            .addCase(UpdateInvitesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isUpdateInviteStatusError = true;
                state.isUpdateInviteStatusSuccess = false;
                state.error = JSON.parse(action.error.message as string);
            });
        builder
            .addCase(RemoveInviteThunk.pending, (state) => {
                state.isLoading = true;
                state.isRemoveInviteError = false;
                state.isRemoveInviteSuccess = false;
            })
            .addCase(RemoveInviteThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.isRemoveInviteError = false;
                state.isRemoveInviteSuccess = true;
            })
            .addCase(RemoveInviteThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isRemoveInviteError = true;
                state.isRemoveInviteSuccess = false;
                state.error = JSON.parse(action.error.message as string);
            });
    },
});

export const { cleanError } = inviteSlice.actions;

export default inviteSlice.reducer;
