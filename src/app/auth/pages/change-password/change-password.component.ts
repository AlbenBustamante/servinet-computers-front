import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IRequestPasswordTempCodeDto } from '@models/auth.model';
import { AuthService } from '@services/auth.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  readonly requestChangePasswordForm;
  readonly requested = signal<boolean>(false);
  readonly requestedLoading = signal<boolean>(false);
  readonly canChange = signal<boolean>(false);
  readonly passwordTempCodeLoading = signal<boolean>(false);
  readonly passwordTempCodeForm;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly formLoading: FormLoading
  ) {
    this.requestChangePasswordForm = this.fb.group({
      userCode: [, Validators.required],
    });

    this.passwordTempCodeForm = this.fb.group({
      passwordTempCode: [, Validators.required],
    });
  }

  requestChangePassword() {
    this.setRequestChangePasswordLoading(true);

    const dto: IRequestPasswordTempCodeDto = {
      userCode: this.requestChangePasswordForm.get('userCode')?.value!,
    };

    this.authService.requestChangePassword(dto).subscribe({
      next: () => {
        this.setRequestChangePasswordLoading(false);
        this.requested.set(true);
      },
      error: (err) => {
        this.setRequestChangePasswordLoading(false);
        console.log(err);
      },
    });
  }

  private setRequestChangePasswordLoading(loading: boolean) {
    this.formLoading.setLoading(
      this.requestChangePasswordForm,
      this.requestedLoading,
      loading
    );
  }
}
