import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  form: FormGroup;
  status: RequestStatus = 'init';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        this.status = 'success';
        console.log(res);
      },
      error: (error) => {
        this.status = 'failed';
        console.log(error);
      },
    });
  }
}
