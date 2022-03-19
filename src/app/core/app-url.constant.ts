import { environment } from '@env/environment';
import { QueryParamKey } from './core.constant';

// "http://localhost:4200"  see: window.location.origin
export const CURRENT_WINDOW_URL = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');


const API_ENDPOINT = environment.apiUrl;
const OAUTH2_UI_REDIRECT_URI = QueryParamKey.REDIRECT_URI + '=' + CURRENT_WINDOW_URL + '/login'
// API Endpoints
export class ApiEndpoints {

    static readonly API_URL = API_ENDPOINT;

    static readonly AUTH = {
        CUSTOM_USER_REGISTRATION: API_ENDPOINT + '/auth/register',
        CUSTOM_USER_LOGIN: API_ENDPOINT + '/auth/login',

        CHECK_VERIFICATION_CODE: API_ENDPOINT + '/auth/check-verification-code',
        RESEND_VERIFICATION_EMAIL: API_ENDPOINT + '/auth/resend-verification-email',
        FORGOT_PASSWORD: API_ENDPOINT + '/auth/send-forgot-password',
        PASSWORD_RESET_SET_NEW_PASS: API_ENDPOINT + '/auth/process-password-reset',


        // '/oauth2/authorize/google?redirect_uri=' + API_ENDPOINT
        GOOGLE_AUTH: API_ENDPOINT + '/oauth2/authorize/google?' + OAUTH2_UI_REDIRECT_URI,
        FACEBOOK_AUTH: API_ENDPOINT + '/oauth2/authorize/facebook?' + OAUTH2_UI_REDIRECT_URI,
        GITHUB_AUTH: API_ENDPOINT + '/oauth2/authorize/github?' + OAUTH2_UI_REDIRECT_URI,

        LOGOUT: API_ENDPOINT + '/logout',

    };

    static readonly USERS = {
        MAIN: API_ENDPOINT + '/users',
        ME: API_ENDPOINT + '/users/me'
    };

}