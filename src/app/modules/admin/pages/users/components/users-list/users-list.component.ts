import { Component } from '@angular/core';
import { faPencil, faRemove } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  readonly users;
  readonly faEdit = faPencil;
  readonly faRemove = faRemove;

  constructor(private readonly userService: UserService) {
    this.users = this.userService.users;
  }
}
