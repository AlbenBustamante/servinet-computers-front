import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '@models/enums';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css'],
})
export class NewUserFormComponent {
  @Output() onCancel = new EventEmitter();
  readonly form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      role: [Role.CASHIER, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.userService.getAll().subscribe({
          next: () => this.emitOnCancel(),
          error: (error) => console.log(error),
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  emitOnCancel() {
    this.form.reset();
    this.onCancel.emit();
  }
}
