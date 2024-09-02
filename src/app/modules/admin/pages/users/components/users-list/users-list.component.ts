import { Component, WritableSignal, signal } from '@angular/core';
import { IUserRes } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  readonly users: WritableSignal<IUserRes[]>;

  constructor(private readonly userService: UserService) {
    this.users = this.userService.users;
  }

  ngOnInit() {
    this.userService.getAll().subscribe();
  }
}
