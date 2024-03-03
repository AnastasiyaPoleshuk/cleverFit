import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateFeedbackRequest } from '../../types/apiTypes';
import { getFeedbacks } from '../../api/getFeedbacks';
import { createFeedback } from '../../api/createFeedback';

export const GetFeedbacksThunk = createAsyncThunk(
    'feedbacks/getFeedbacks',
    async (token: string) => {
        const response = await getFeedbacks(token);
        return response;
    },
);

export const CreateFeedbacksThunk = createAsyncThunk(
    'feedbacks/createFeedbacks',
    async (request: ICreateFeedbackRequest) => {
        const response = await createFeedback(request);
        return response;
    },
);
