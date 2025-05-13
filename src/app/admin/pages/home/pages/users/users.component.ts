import { Component, signal, ViewChild } from '@angular/core';
import { UserService } from '@services/user.service';
import { UpdateUserFormComponent } from './components/update-user-form/update-user-form.component';
import { AuthService } from '@services/auth.service';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  @ViewChild(UpdateUserFormComponent) updateUserForm!: UpdateUserFormComponent;
  @ViewChild(NewUserFormComponent) newUserForm!: NewUserFormComponent;
  readonly showSideBarRegister = signal<boolean>(false);
  readonly showSideBarUpdate = signal<boolean>(false);
  readonly loading = signal<boolean>(false);
  readonly userToUpdateLoading;
  readonly userToRegisterLoading;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    this.userToUpdateLoading = this.userService.userToUpdateLoading;
    this.userToRegisterLoading = this.authService.userToRegisterLoading;
  }

  ngOnInit() {
    this.loading.set(true);

    this.userService.getAll().subscribe({
      next: (_) => this.loading.set(false),
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
