import { Component, EventEmitter, Output, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '@models/enums';
import { IUserRes } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css'],
})
export class NewUserFormComponent {
  @Output() onComplete = new EventEmitter<void>();
  readonly form: FormGroup;
  readonly users: WritableSignal<IUserRes[]>;
  readonly loading;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly formLoading: FormLoading
  ) {
    this.loading = this.authService.userToRegisterLoading;
    this.users = this.userService.users;

    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [Role.CASHIER, Validators.required],
    });
  }

  emitOnComplete() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    this.setLoading(true);

    this.authService.register(this.form.value).subscribe({
      next: (user) => {
        this.users.update((users) => [...users, user]);
        this.form.reset();
        this.form.patchValue({ role: Role.CASHIER });
        this.setLoading(false);
      },
      error: (error) => {
        console.log(error);
        this.setLoading(false);
      },
      complete: () => this.onComplete.emit(),
    });
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(this.form, this.loading, loading);
  }
}
