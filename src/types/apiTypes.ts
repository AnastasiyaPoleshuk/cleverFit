import { Moment } from 'moment';
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
    id?: string;
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
    passwordRepeat?: string;
    firstName?: string;
    lastName?: string;
    birthday?: Moment;
    imgSrc?: string;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
}

export interface IUploadAvatarResponse {
    name: string;
    url: string;
}

export interface ITariffListResponse {
    _id: string;
    name: string;
    periods: {
        text: string;
        cost: number;
        days: number;
    }[];
}

export interface IPostTariffRequest {
    tariffId: string;
    days: number;
}

export interface IGetTrainingPalsResponse {
    id: string;
    name: string;
    trainingType: string;
    imageSrc?: string;
    avgWeightInWeek: number;
    inviteId: string;
    status: string;
}

export interface IGetInviteResponse {
    _id: string;
    from: {
        _id: string;
        firstName?: string;
        lastName?: string;
        imageSrc?: string;
    };
    training: IGetTrainingsResponse;
    status: string;
    createdAt: string;
}

export interface ICreateInviteRequest {
    to: string;
    trainingId: string;
}

export interface ICreateInviteResponse {
    _id: string;
    from: {
        _id: string;
        firstName?: string;
        lastName?: string;
        imageSrc?: string;
    };
    training: IGetTrainingsResponse;
    status: string;
    createdAt: string;
    to: {
        _id: string;
        firstName?: string;
        lastName?: string;
        imageSrc?: string;
    };
}

export interface IUpdateInviteStatusRequest {
    id: string;
    status: string;
}
