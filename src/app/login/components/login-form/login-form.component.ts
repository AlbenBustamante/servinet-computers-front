import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '@models/enums';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  readonly form: FormGroup;
  readonly loading = signal<boolean>(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      code: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.loading.set(true);

    this.authService.login(this.form.value).subscribe({
      next: () => {
        const { role } = this.tokenService.getInfo();
        this.loading.set(false);
        this.router.navigateByUrl(role === Role.ADMIN ? '/admin' : '/portal');
      },
      error: (error) => {
        this.loading.set(false);
        console.log(error);
      },
    });
  }
}
