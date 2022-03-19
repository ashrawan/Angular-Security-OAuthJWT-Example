import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, ParamMap, Params } from '@angular/router';
import { appBrandName, QueryParamKey } from '@app/core/core.constant';
import { CoreUtil } from '@app/core/core.util';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { VerifyEmailContext, VerifyForgotPasswordContext } from '../auth.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-verify-request',
  templateUrl: './verify-request.component.html',
  styleUrls: ['./verify-request.component.scss']
})
export class VerifyRequestComponent implements OnInit {

  readonly appBrandName = appBrandName;

  // Page State
  loading: boolean = false;
  hasError: boolean = false;
  responseMessage: string = '';

  // Form state
  setNewPasswordForm!: FormGroup;
  isNPFormSubmitted = false;

  isProcessVerifyEmail: boolean = false;
  isProcessResetPassword: boolean = false;
  routeQueryParams: Params = {};
  paramMap!: ParamMap

  private unsubscribe = new Subject<void>();

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.processRouteQueryParams();
    this.initializeSetNewPasswordForm();
  }

  initializeSetNewPasswordForm(): void {
    this.setNewPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      passwordConfirm: ['', Validators.required]
    }, {
      validator: CoreUtil.ConfirmedValidator('password', 'passwordConfirm')
    });
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.setNewPasswordForm.controls;
  }

  private processRouteQueryParams(): void {
    this.route.queryParams
      .pipe(
        filter((val: Params) => val && Object.keys(val).length > 0),
        takeUntil(this.unsubscribe)
      )
      .subscribe((params: Params) => {
        this.routeQueryParams = params;
        const paramMap: ParamMap = convertToParamMap(params);
        this.paramMap = paramMap;
        const isProcessVerifyEmail = paramMap.get(QueryParamKey.IS_PROCESS_VERIFY_EMAIL) || '';
        const isProcessPasswordReset = paramMap.get(QueryParamKey.IS_PROCESS_PASSWORD_RESET) || '';
        if (isProcessVerifyEmail && isProcessVerifyEmail.length > 0) {
          this.isProcessVerifyEmail = true;
          this.verifyEmailVerificationRequest(this.paramMap);
        } else if (isProcessPasswordReset && isProcessPasswordReset.length > 0) {
          this.initializeSetNewPasswordForm();
          this.isProcessResetPassword = true;
        } else {
          this.isProcessVerifyEmail = false;
          this.isProcessResetPassword = false;
        }

      });
  }

  private verifyEmailVerificationRequest(paramMap: ParamMap) {
    console.log('verify email - verification request', paramMap);
    const email = paramMap.get(QueryParamKey.EMAIL) || '';
    const verificationCode = paramMap.get(QueryParamKey.VERIFICATION_CODE) || '';
    const registeredProviderName = paramMap.get(QueryParamKey.REGISTERED_PROVIDER_NAME) || '';
    const verifyEmailContext: VerifyEmailContext = {
      email: email,
      verificationCode: verificationCode,
      registeredProviderName: registeredProviderName
    };
    this.loading = true;
    this.authenticationService.verifyEmailVerificationRequest(verifyEmailContext, false)
      .pipe()
      .subscribe(
        res => {
          this.loading = false;
          this.hasError = false;
          this.responseMessage = 'Email Verification Successful. You can Login now';
        },
        err => {
          this.loading = false;
          this.hasError = true;
          console.log(err);
          this.responseMessage = err?.error?.response || 'Sorry! Something went wrong !!!';
        }
      );
  }

  onNewPasswordSet(): void {
    this.isNPFormSubmitted = true;
    if (this.setNewPasswordForm.invalid) {
      return;
    }
    const formValue = this.setNewPasswordForm.value;
    this.verifyAndProcessForgotPasswordRequest(this.paramMap, formValue.password);
  }

  private verifyAndProcessForgotPasswordRequest(paramMap: ParamMap, newPassword: string) {
    console.log('verify email - reset password request', paramMap);
    const email = paramMap.get(QueryParamKey.EMAIL) || '';
    const forgotPasswordVerCode = paramMap.get(QueryParamKey.FORGOT_PASSWORD_VER_CODE) || '';
    const verifyForgotPasswordContext: VerifyForgotPasswordContext = {
      email: email,
      forgotPasswordVerCode: forgotPasswordVerCode,
      newPassword: newPassword
    };
    this.loading = true;
    this.authenticationService.verifyAndProcessForgotPasswordRequest(verifyForgotPasswordContext, true)
      .pipe()
      .subscribe(
        res => {
          this.loading = false;
          this.hasError = false;
          this.responseMessage = 'Password reset Successful';
        },
        err => {
          this.loading = false;
          this.hasError = true;
          console.log(err);
          this.responseMessage = err?.error?.response || 'Sorry! Something went wrong !!!';
        }
      );
  }

}


