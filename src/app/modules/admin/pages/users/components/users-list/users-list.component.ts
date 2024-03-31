import { Component, signal } from '@angular/core';
import { IUserRes } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  readonly users = signal<IUserRes[]>([]);

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (res) => {
        this.users.set(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
