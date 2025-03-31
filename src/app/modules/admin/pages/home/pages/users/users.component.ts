import { Component, signal } from '@angular/core';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  readonly showSideBarRegister = signal<boolean>(false);
  readonly showSideBarUpdate = signal<boolean>(false);
  readonly loading = signal<boolean>(false);

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.loading.set(true);
    this.userService.getAll().subscribe({
      next: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  toggleShowSideBar() {
    this.showSideBarRegister.update((prevValue) => !prevValue);
  }

  cancelRegister() {
    this.showSideBarRegister.set(false);
  }
}
