import { Component, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '@models/enums';
import { AuthService } from '@services/auth.service';
import { LoadingService } from '@services/loading.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  readonly form: FormGroup;
  readonly loading;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly router: Router,
    private readonly loadingService: LoadingService
  ) {
    this.loading = this.loadingService.loading;

    this.form = this.fb.group({
      code: ['', Validators.required],
      password: ['', Validators.required],
    });

    effect(() => {
      if (this.loading()) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.authService.login(this.form.value).subscribe({
      next: () => {
        const { role } = this.tokenService.getInfo();
        this.router.navigateByUrl(role === Role.ADMIN ? '/admin' : '/portal');
      },
    });
  }
}
