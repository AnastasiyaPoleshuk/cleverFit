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
