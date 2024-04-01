import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  showSideBar = signal<boolean>(false);

  toggleShowSideBar() {
    this.showSideBar.update((prevValue) => !prevValue);
  }

  cancelRegister() {
    this.showSideBar.set(false);
  }
}
