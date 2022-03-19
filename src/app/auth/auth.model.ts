import { UserDTO } from "@app/core/model/user.model";

export enum OAuth2Provider {
    GOOGLE,
    FACEBOOK,
    GITHUB
}

export interface RegisterContext {
    fullName: string;
    email: string;
    password: string;
}
export interface VerifyEmailContext {
    email: string;
    verificationCode: string;
    registeredProviderName: string;
}
export interface VerifyForgotPasswordContext {
    email: string;
    forgotPasswordVerCode: string;
    newPassword: string;
}

export interface LoginContext {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface AuthResponse {
    token: string;
}

export interface JwtTokenPayload {
    sub: string;
    email: string;
    user: UserDTO
    authorities?: object;
    attributes?: object;
    iat: string;
    exp: string
}
