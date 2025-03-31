import { Component, signal, ViewChild } from '@angular/core';
import { UserService } from '@services/user.service';
import { UpdateUserFormComponent } from './components/update-user-form/update-user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  @ViewChild(UpdateUserFormComponent) updateUserForm!: UpdateUserFormComponent;
  readonly showSideBarRegister = signal<boolean>(false);
  readonly showSideBarUpdate = signal<boolean>(false);
  readonly loading = signal<boolean>(false);
  readonly userToUpdateLoading;

  constructor(private readonly userService: UserService) {
    this.userToUpdateLoading = this.userService.userToUpdateLoading;
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
