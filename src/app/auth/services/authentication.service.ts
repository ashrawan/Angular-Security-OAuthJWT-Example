import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, convertToParamMap, ParamMap, Params, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { ApiEndpoints } from '@app/core/app-url.constant';
import { UserDTO } from '@app/core/model/user.model';
import { Observable, of } from 'rxjs';
import { AuthResponse, JwtTokenPayload, LoginContext, OAuth2Provider, RegisterContext, VerifyEmailContext, VerifyForgotPasswordContext } from '../auth.model';
import { Credentials, CredentialsService } from './credentials.service';
import { APP_ROUTES, QueryParamKey, QueryParamUIKey } from '@app/core/core.constant';
import { GenericResponse } from '@app/core/core.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly AUTH_URL = ApiEndpoints.AUTH;

  constructor(private credentialsService: CredentialsService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {
  }

  public registerUser(registerContext: RegisterContext, redirectToLoginUri?: boolean): Observable<UserDTO> {
    const userDTOObservable: Observable<UserDTO> = this.http.post<UserDTO>(this.AUTH_URL.CUSTOM_USER_REGISTRATION, registerContext);
    const processedUserDTOObservable: Observable<UserDTO> = userDTOObservable.pipe(
      map((userDTO: UserDTO) => {
        if (redirectToLoginUri) {
          this.router.navigate([APP_ROUTES.LOGIN], { queryParams: { [QueryParamUIKey.REGISTRATION_SUCCESSFUL]: "Registration Successful, Please check your email for verification." }, replaceUrl: true });
        }
        return userDTO;
      })
    );
    return processedUserDTOObservable;
  }

  public verifyEmailVerificationRequest(verifyEmailContext: VerifyEmailContext, redirectToLoginUri?: boolean): Observable<GenericResponse<boolean>> {
    const checkVerificationCodeResponse: Observable<GenericResponse<boolean>> = this.http.post<GenericResponse<boolean>>(this.AUTH_URL.CHECK_VERIFICATION_CODE, verifyEmailContext);
    const processedVerificationCodeObservable: Observable<GenericResponse<boolean>> = checkVerificationCodeResponse.pipe(
      map((verificationResponse: GenericResponse<boolean>) => {
        if (redirectToLoginUri) {
          this.router.navigate([APP_ROUTES.LOGIN], { queryParams: { [QueryParamUIKey.EMAIL_VERIFICATION_SUCCESSFUL]: "Email Verification Successful" }, replaceUrl: true });
        }
        return verificationResponse;
      })
    );
    return processedVerificationCodeObservable;
  }

  public login(loginContext: LoginContext, redirectAfterLogin: boolean = false, defaultRedirectUri: string | null = '/'): Observable<Credentials> {
    const authResponseObservable: Observable<AuthResponse> = this.http.post<AuthResponse>(this.AUTH_URL.CUSTOM_USER_LOGIN, loginContext);
    const generateCredentialsObservable: Observable<Credentials> = authResponseObservable.pipe(
      map((authResponse: AuthResponse) => {
        const tokenPayload: JwtTokenPayload = this.parseJwt(authResponse.token);
        const credentialsData: Credentials = {
          email: tokenPayload.email,
          token: authResponse.token,
          jwtTokenPayload: tokenPayload
        };
        this.credentialsService.setCredentials(credentialsData, loginContext.rememberMe);
        console.log('User Login successful generated credentials ', credentialsData);

        if (redirectAfterLogin) {
          if (defaultRedirectUri && defaultRedirectUri.length > 0) {
            defaultRedirectUri = defaultRedirectUri;
          } else {
            defaultRedirectUri = '/'
          }
          this.redirectToTargetRequestUri(defaultRedirectUri);
        }
        return credentialsData;
      })
    );

    return generateCredentialsObservable;
  }

  // For Sign Up and Sign In - We have same functionality for now. we can customize for signUp too if required (Update backend code)
  public onOAuth2ButtonClick(oauth2Provider: OAuth2Provider, routeQueryParams: Params, isSignUp?: boolean): void {
    console.log('appending routeQueryParams', routeQueryParams);
    const queryString = Object.entries(routeQueryParams)
      .map(entry => entry.join('='))
      .join('&');
    const appendQueryParams = queryString ? `&${queryString}` : '';
    let oauth2ProviderUrl: string = ''
    switch (oauth2Provider) {
      case OAuth2Provider.GOOGLE:
        oauth2ProviderUrl = this.AUTH_URL.GOOGLE_AUTH + appendQueryParams;
        break;
      case OAuth2Provider.FACEBOOK:
        oauth2ProviderUrl = this.AUTH_URL.FACEBOOK_AUTH + appendQueryParams;
        break;
      case OAuth2Provider.GITHUB:
        oauth2ProviderUrl = this.AUTH_URL.GITHUB_AUTH + appendQueryParams;
        break
      default:
        console.log('Incorrect oauth2Provicer');
        break;
    }

    if (oauth2ProviderUrl && oauth2ProviderUrl.length > 0) {
      console.log('Hitting MyApp-Backend-Service - Outh2 authentication endpoint ', oauth2ProviderUrl);
      // TODO check with iframe too
      const windowTarget: string = '_self';
      window.open(oauth2ProviderUrl, windowTarget);
    }

  }

  public processforgotPassword(email: string): Observable<GenericResponse<boolean>> {
    const forgotPasswordResponse: Observable<GenericResponse<boolean>> = this.http.post<GenericResponse<boolean>>(this.AUTH_URL.FORGOT_PASSWORD, { email: email });
    const processedForgotPasswordResponse: Observable<GenericResponse<boolean>> = forgotPasswordResponse.pipe(
      map((passwordForgotResponse: GenericResponse<boolean>): GenericResponse<boolean> => {
        console.log('Password reset link Sent for email: ', email);
        return passwordForgotResponse;
      })
    );
    return processedForgotPasswordResponse;
  }

  public verifyAndProcessForgotPasswordRequest(verifyForgotPasswordContext: VerifyForgotPasswordContext, redirectToLoginUri?: boolean): Observable<GenericResponse<boolean>> {
    const fpVerificationResponseObs: Observable<GenericResponse<boolean>> = this.http.post<GenericResponse<boolean>>(this.AUTH_URL.PASSWORD_RESET_SET_NEW_PASS, verifyForgotPasswordContext);
    const processedFPVerificationResponseObs: Observable<GenericResponse<boolean>> = fpVerificationResponseObs.pipe(
      map((fpVerificationResponse: GenericResponse<boolean>) => {
        if (redirectToLoginUri) {
          console.log('Password reset request verified and new password set: ', verifyForgotPasswordContext.email);
          this.router.navigate([APP_ROUTES.LOGIN], { queryParams: { [QueryParamUIKey.PASSWORD_RESET_SUCCESSFUL]: "Password Reset Successful. Please Login" }, replaceUrl: true });
        }
        return fpVerificationResponse;
      })
    );
    return processedFPVerificationResponseObs;
  }

  public logout(shouldRedirect: boolean = true, defaultRedirectUri: string = APP_ROUTES.LOGIN): Observable<boolean> {
    this.credentialsService.setCredentials(null);
    if (shouldRedirect) {
      this.redirectToTargetRequestUri(defaultRedirectUri);
    }
    return of(true);
  }

  public processAuthQueryParams(allowAuthRedirection: boolean = true): Observable<Params> {
    const processedQueryParamsObservable: Observable<Params> = this.route.queryParams
      .pipe(
        filter((params: Params) => params && Object.keys(params).length > 0),
        map((params: Params) => {
          const routeQueryParams: Params = { ...params }
          if (params && params.hasOwnProperty(QueryParamKey.TOKEN)) {
            const paramMap: ParamMap = convertToParamMap(routeQueryParams);
            if (paramMap.has(QueryParamKey.TOKEN)) {
              this.setOAuth2SuccessCredentials(paramMap, allowAuthRedirection);
              delete routeQueryParams[QueryParamKey.TOKEN];
            }
          }
          return routeQueryParams;
        })
      );
    return processedQueryParamsObservable;
  }

  private setOAuth2SuccessCredentials(resParamMap: ParamMap, redirectToOriginalUri?: boolean): boolean {
    console.log('Login Successful');
    const jwtToken = resParamMap.get('token') || '';
    const tokenPayload: JwtTokenPayload = this.parseJwt(jwtToken);
    const credentialsData: Credentials = {
      email: tokenPayload.email,
      token: jwtToken,
      jwtTokenPayload: tokenPayload
    };
    this.credentialsService.setCredentials(credentialsData, false);
    if (redirectToOriginalUri) {
      const originalRequestedUri = resParamMap.get(QueryParamKey.ORIGINAL_REQUEST_URI)
      this.redirectToTargetRequestUri(originalRequestedUri);
    }
    return true;
  }

  private redirectToTargetRequestUri(targetRequestedUri?: string | null): void {
    const targetUri = targetRequestedUri && targetRequestedUri.length > 0 ? targetRequestedUri : '/'
    this.router.navigate([targetUri]);
  }

  // OPTIONAL: Parsing JWT Token to obtain extra-data
  private parseJwt(token: any): JwtTokenPayload {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    return JSON.parse(jsonPayload);
  };

}
