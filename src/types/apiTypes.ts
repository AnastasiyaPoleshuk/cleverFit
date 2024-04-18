import { Moment } from 'moment';
import { ISenderInviteData, ITrainingExercises, ITrainingParameters } from './storeTypes';

export type IAuthRequest = {
    email: string;
    password: string;
    remember?: boolean;
};

export type ILoginResponse = {
    accessToken: string;
};

export type IRequestError = {
    statusCode: number;
    error: string;
    message: string;
};

export type ICheckEmailResponse = {
    email: string;
    message: string;
};

export type IConfirmEmailRequest = {
    email: string;
    code: string;
};

export type IConfirmEmailResponse = {
    email: string;
    message: string;
};

export type IChangePasswordRequest = {
    password: string;
    confirmPassword: string;
};

export type IFeedbacks = {
    fullName: string | null;
    imageSrc: string | null;
    rating: number;
    createdAt: string;
    id?: string;
    message?: string;
};

export type ICreateFeedbackRequest = {
    message: string;
    rating: number;
};

export type IGetTrainingsResponse = {
    _id: string;
    id?: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: ITrainingParameters;
    exercises: ITrainingExercises[];
};

export type IGetTrainingListResponse = {
    name: string;
    key: string;
};

export type ICreateTrainingRequest = {
    _id: string | undefined;
    name: string;
    date: string;
    isImplementation: boolean;
    exercises: ITrainingExercises[];
};

export type IUser = {
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
};

export type IUpdateUser = {
    email: string;
    password?: string;
    passwordRepeat?: string;
    firstName?: string;
    lastName?: string;
    birthday?: Moment;
    imgSrc?: string;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
};

export type IUploadAvatarResponse = {
    name: string;
    url: string;
};

export type ITariffListResponse = {
    _id: string;
    name: string;
    periods: {
        text: string;
        cost: number;
        days: number;
    }[];
};

export type IPostTariffRequest = {
    tariffId: string;
    days: number;
};

export type IGetTrainingPalsResponse = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc?: string;
    avgWeightInWeek: number;
    inviteId: string;
    status: string;
};

export type IGetInviteResponse = {
    _id: string;
    from: ISenderInviteData;
    training: IGetTrainingsResponse;
    status: string;
    createdAt: string;
};

export type ICreateInviteRequest = {
    to: string;
    trainingId: string;
};

export type ICreateInviteResponse = {
    _id: string;
    from: ISenderInviteData;
    training: IGetTrainingsResponse;
    status: string;
    createdAt: string;
    to: ISenderInviteData;
};

export type IUpdateInviteStatusRequest = {
    id: string;
    status: string;
};

export type weekStatistic = {
    id: string;
    weekDay: string;
    weight: number;
};
