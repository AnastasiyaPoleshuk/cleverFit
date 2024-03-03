import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFeedbacks, IRequestError } from '../../types/apiTypes';
import { CreateFeedbacksThunk, GetFeedbacksThunk } from '@redux/thunk/feedbacksThunk';

interface IInitialState {
    feedbacks: IFeedbacks[];
    isLoading: boolean;
    error: IRequestError;
    isGetFeedbacksError: boolean;
    isGetFeedbacksSuccess: boolean;
    isCreateFeedbackError: boolean;
    isCreateFeedbackSuccess: boolean;
}

const initialState: IInitialState = {
    feedbacks: [],
    isLoading: false,
    error: {
        statusCode: 0,
        error: '',
        message: '',
    },
    isGetFeedbacksError: false,
    isGetFeedbacksSuccess: false,
    isCreateFeedbackError: false,
    isCreateFeedbackSuccess: false,
};

const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        changeGetFeedbacksErrorState: (state, action: PayloadAction<boolean>) => {
            state.isGetFeedbacksError = action.payload;
        },
        changeGetFeedbacksSuccessState: (state, action: PayloadAction<boolean>) => {
            state.isGetFeedbacksSuccess = action.payload;
        },
        changeCreateFeedbackErrorState: (state, action: PayloadAction<boolean>) => {
            state.isCreateFeedbackError = action.payload;
        },
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
            .addCase(GetFeedbacksThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetFeedbacksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isGetFeedbacksError = false;
                state.isGetFeedbacksSuccess = true;

                state.feedbacks = action.payload.data;
            })
            .addCase(GetFeedbacksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isGetFeedbacksError = true;
                state.isGetFeedbacksSuccess = false;
                state.error = JSON.parse(action.error.message as string);
            });

        builder
            .addCase(CreateFeedbacksThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreateFeedbacksThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.isCreateFeedbackError = false;
                state.isCreateFeedbackSuccess = true;
            })
            .addCase(CreateFeedbacksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isCreateFeedbackError = true;
                state.isCreateFeedbackSuccess = false;

                state.error = JSON.parse(action.error.message as string);
            });
    },
});

export const {
    changeGetFeedbacksErrorState,
    changeCreateFeedbackErrorState,
    cleanError,
    changeGetFeedbacksSuccessState,
} = feedbacksSlice.actions;

export default feedbacksSlice.reducer;
