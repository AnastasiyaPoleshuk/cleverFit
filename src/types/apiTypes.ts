import { ITrainingExercises, ITrainingParameters } from './storeTypes';

export interface IAuthRequest {
    email: string;
    password: string;
    remember?: boolean;
}

export interface ILoginResponse {
    accessToken: string;
}

export interface IRequestError {
    statusCode: number;
    error: string;
    message: string;
}

export interface ICheckEmailResponse {
    email: string;
    message: string;
}

export interface IConfirmEmailRequest {
    email: string;
    code: string;
}

export interface IConfirmEmailResponse {
    email: string;
    message: string;
}

export interface IChangePasswordRequest {
    password: string;
    confirmPassword: string;
}

export interface IFeedbacks {
    fullName: string | null;
    imageSrc: string | null;
    rating: number;
    createdAt: string;
    id?: string;
    message?: string;
}

export interface ICreateFeedbackRequest {
    message: string;
    rating: number;
}

export interface IGetTrainingsResponse {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: ITrainingParameters;
    exercises: ITrainingExercises[];
}

export interface IGetTrainingListResponse {
    name: string;
    key: string;
}

export interface ICreateTrainingRequest {
    _id: string | undefined;
    name: string;
    date: string;
    isImplementation: boolean;
    exercises: ITrainingExercises[];
}

export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff: {
        tariffId: string;
        expired: string;
    };
}

export interface IUpdateUser {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
}

export interface IUploadAvatarResponse {
    name: string;
    url: string;
}
