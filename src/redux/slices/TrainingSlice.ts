import { createSlice } from '@reduxjs/toolkit';
import { IGetTrainingPalsResponse, IRequestError } from '../../types/apiTypes';
import { GetTrainingPalsThunk, GetUsersForJoinTrainingThunk } from '@redux/thunk/TrainingThunk';

interface IInitialState {
    trainingPals: IGetTrainingPalsResponse[];
    usersForJoinTraining: IGetTrainingPalsResponse[];
    isLoading: boolean;
    error: IRequestError;
    isGeTrainingPalsError: boolean;
    isGeTrainingPalsSuccess: boolean;
    isGetUsersForJoinTrainingError: boolean;
    isGetUsersForJoinTrainingSuccess: boolean;
}

const initialState: IInitialState = {
    trainingPals: [],
    usersForJoinTraining: [],
    isLoading: false,
    error: {
        statusCode: 0,
        error: '',
        message: '',
    },
    isGeTrainingPalsError: false,
    isGeTrainingPalsSuccess: false,
    isGetUsersForJoinTrainingError: false,
    isGetUsersForJoinTrainingSuccess: false,
};

const trainingSlice = createSlice({
    name: 'training',
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
            .addCase(GetTrainingPalsThunk.pending, (state) => {
                state.isLoading = true;
                state.isGeTrainingPalsError = false;
                state.isGeTrainingPalsSuccess = false;
            })
            .addCase(GetTrainingPalsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isGeTrainingPalsError = false;
                state.isGeTrainingPalsSuccess = true;

                state.trainingPals = action.payload.data;
            })
            .addCase(GetTrainingPalsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isGeTrainingPalsError = true;
                state.isGeTrainingPalsSuccess = false;
                state.error = JSON.parse(action.error.message as string);
            });
        builder
            .addCase(GetUsersForJoinTrainingThunk.pending, (state) => {
                state.isLoading = true;
                state.isGetUsersForJoinTrainingError = false;
                state.isGetUsersForJoinTrainingSuccess = false;
            })
            .addCase(GetUsersForJoinTrainingThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isGetUsersForJoinTrainingError = false;
                state.isGetUsersForJoinTrainingSuccess = true;

                state.usersForJoinTraining = action.payload.data;
            })
            .addCase(GetUsersForJoinTrainingThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isGetUsersForJoinTrainingError = true;
                state.isGetUsersForJoinTrainingSuccess = false;
                state.error = JSON.parse(action.error.message as string);
            });
    },
});

export const { cleanError } = trainingSlice.actions;

export default trainingSlice.reducer;
