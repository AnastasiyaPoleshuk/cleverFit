import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    IGetTrainingListResponse,
    IGetTrainingsResponse,
    IRequestError,
} from '../../types/apiTypes';
import {
    CreateTrainingThunk,
    GetTrainingInfoThunk,
    GetTrainingListThunk,
    UpdateTrainingThunk,
} from '@redux/thunk/TrainingThunk';

interface IInitialState {
    trainingInfo: IGetTrainingsResponse[];
    trainingList: IGetTrainingListResponse[];
    training: IGetTrainingsResponse;
    isLoading: boolean;
    error: IRequestError;
    isGetTrainingInfoError: boolean;
    isGetTrainingInfoSuccess: boolean;
    isGetTrainingListError: boolean;
    isGetTrainingListSuccess: boolean;
    isCreateTrainingError: boolean;
    isCreateTrainingSuccess: boolean;
    isUpdateTrainingError: boolean;
    isUpdateTrainingSuccess: boolean;
}

const initialState: IInitialState = {
    trainingInfo: [],
    trainingList: [],
    training: {
        _id: '',
        name: '',
        date: '',
        isImplementation: false,
        userId: '',
        parameters: {
            repeat: false,
            period: 0,
            jointTraining: false,
            participants: [],
        },
        exercises: [],
    },
    isLoading: false,
    error: {
        statusCode: 0,
        error: '',
        message: '',
    },
    isGetTrainingInfoError: false,
    isGetTrainingInfoSuccess: false,
    isGetTrainingListError: false,
    isGetTrainingListSuccess: false,
    isCreateTrainingError: false,
    isUpdateTrainingError: false,
    isCreateTrainingSuccess: false,
    isUpdateTrainingSuccess: false,
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        changeGetTrainingInfoErrorState: (state, action: PayloadAction<boolean>) => {
            state.isGetTrainingInfoError = action.payload;
        },
        changeGetTrainingInfoSuccessState: (state, action: PayloadAction<boolean>) => {
            state.isGetTrainingInfoSuccess = action.payload;
        },
        changeGetTrainingListErrorState: (state, action: PayloadAction<boolean>) => {
            state.isGetTrainingListError = action.payload;
        },
        changeGetTrainingListSuccessState: (state, action: PayloadAction<boolean>) => {
            state.isGetTrainingListSuccess = action.payload;
        },
        changeCreateTrainingErrorState: (state, action: PayloadAction<boolean>) => {
            state.isCreateTrainingError = action.payload;
        },
        changeCreateTrainingSuccessState: (state, action: PayloadAction<boolean>) => {
            state.isCreateTrainingSuccess = action.payload;
        },
        changeUpdateTrainingErrorState: (state, action: PayloadAction<boolean>) => {
            state.isUpdateTrainingError = action.payload;
        },
        changeUpdateTrainingSuccessState: (state, action: PayloadAction<boolean>) => {
            state.isUpdateTrainingSuccess = action.payload;
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
            .addCase(GetTrainingInfoThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetTrainingInfoThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isGetTrainingInfoError = false;
                state.isGetTrainingInfoSuccess = true;

                state.trainingInfo = action.payload.data;
            })
            .addCase(GetTrainingInfoThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isGetTrainingInfoError = true;
                state.isGetTrainingInfoSuccess = false;
                state.error = JSON.parse(action.error.message as string);
            });

        builder
            .addCase(GetTrainingListThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetTrainingListThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isGetTrainingListError = false;
                state.isGetTrainingListSuccess = true;

                state.trainingList = action.payload.data;
            })
            .addCase(GetTrainingListThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isGetTrainingListError = true;
                state.isGetTrainingListSuccess = false;
                state.error = JSON.parse(action.error.message as string);
            });
        builder
            .addCase(CreateTrainingThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreateTrainingThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isCreateTrainingError = false;
                state.isCreateTrainingSuccess = true;

                state.training = action.payload.data;
            })
            .addCase(CreateTrainingThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isCreateTrainingError = true;
                state.isCreateTrainingSuccess = false;
                state.error = JSON.parse(action.error.message as string);
            });
        builder
            .addCase(UpdateTrainingThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateTrainingThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isUpdateTrainingError = false;
                state.isUpdateTrainingSuccess = true;

                state.training = action.payload.data;
            })
            .addCase(UpdateTrainingThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isUpdateTrainingError = true;
                state.isUpdateTrainingSuccess = false;
                state.error = JSON.parse(action.error.message as string);
            });
    },
});

export const {
    changeGetTrainingInfoErrorState,
    changeGetTrainingInfoSuccessState,
    cleanError,
    changeGetTrainingListErrorState,
    changeGetTrainingListSuccessState,
} = calendarSlice.actions;

export default calendarSlice.reducer;
