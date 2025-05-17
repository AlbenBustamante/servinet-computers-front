import { Component, computed, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IChangePasswordDto,
  IRequestPasswordTempCodeDto,
} from '@models/auth.model';
import { AuthService } from '@services/auth.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  readonly requestChangePasswordForm;
  readonly userCode = signal<string>('');
  readonly requested = signal<boolean>(false);
  readonly requestedLoading = signal<boolean>(false);
  readonly changePasswordLoading = signal<boolean>(false);
  readonly changePasswordForm;

  readonly title = computed(() => {
    const requested = this.requested();

    return requested
      ? 'Confirmar cambio de clave'
      : 'Solicitud para cambio de clave';
  });

  readonly subtitle = computed(() => {
    const requested = this.requested();

    return requested
      ? 'Ingresa el código temporal enviado a tu correo registrado'
      : 'Ingresa tu código de acceso para enviarte un código temporal';
  });

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly formLoading: FormLoading,
    private readonly router: Router
  ) {
    this.requestChangePasswordForm = this.fb.group({
      userCode: [, Validators.required],
    });

    this.changePasswordForm = this.fb.group({
      tempCode: [, Validators.required],
      newPassword: [, Validators.required],
      confirmPassword: [, Validators.required],
    });
  }

  requestChangePassword() {
    this.setRequestChangePasswordLoading(true);

    const dto: IRequestPasswordTempCodeDto = {
      userCode: this.requestChangePasswordForm.get('userCode')?.value!,
    };

    this.authService.requestChangePassword(dto).subscribe({
      next: () => {
        this.userCode.set(dto.userCode);
        this.requested.set(true);
        this.requestChangePasswordForm.reset();
        this.setRequestChangePasswordLoading(false);
      },
      error: (err) => {
        this.setRequestChangePasswordLoading(false);
        console.log(err);
      },
    });
  }

  changePassword() {
    this.setChangePasswordLoading(true);

    const dto: IChangePasswordDto = {
      userCode: this.userCode(),
      tempCode: this.changePasswordForm.get('tempCode')?.value!,
      newPassword: this.changePasswordForm.get('newPassword')?.value!,
      confirmPassword: this.changePasswordForm.get('confirmPassword')?.value!,
    };

    this.authService.changePassword(dto).subscribe({
      next: () => {
        this.setChangePasswordLoading(false);
        this.changePasswordForm.reset();
        this.goToLogin();
        alert('Cambio exitoso');
      },
      error: (err) => {
        console.log(err);
        this.setChangePasswordLoading(false);
      },
    });
  }

  goToLogin() {
    this.router.navigateByUrl('/auth');
  }

  private setRequestChangePasswordLoading(loading: boolean) {
    this.formLoading.setLoading(
      this.requestChangePasswordForm,
      this.requestedLoading,
      loading
    );
  }

  private setChangePasswordLoading(loading: boolean) {
    this.formLoading.setLoading(
      this.changePasswordForm,
      this.changePasswordLoading,
      loading
    );
  }
}
