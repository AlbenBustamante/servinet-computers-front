import {
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '@models/enums';
import { IUserRes } from '@models/user.model';
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
  readonly users: WritableSignal<IUserRes[]>;
  readonly loading = signal<boolean>(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    this.users = this.userService.users;

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

    this.loading.set(true);

    this.authService.register(this.form.value).subscribe({
      next: (user) => {
        this.users.update((users) => [...users, user]);
        this.loading.set(false);
        this.emitOnCancel();
      },
      error: (error) => {
        this.loading.set(false);
        console.log(error);
      },
    });
  }

  emitOnCancel() {
    this.form.reset();
    this.onCancel.emit();
  }
}
