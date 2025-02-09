import { Component, signal } from '@angular/core';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  readonly showSideBar = signal<boolean>(false);
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
    this.showSideBar.update((prevValue) => !prevValue);
  }

  cancelRegister() {
    this.showSideBar.set(false);
  }
}
