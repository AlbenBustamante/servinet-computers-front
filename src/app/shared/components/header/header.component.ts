import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import {
  faBars,
  faChevronRight,
  faLaptop,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() onClickHamburguer = new EventEmitter<void>();
  private readonly authService = inject(AuthService);
  readonly showDropdown = signal<boolean>(false);
  readonly loggedIn = this.authService.loggedIn;
  readonly faComputer = faLaptop;
  readonly faAccount = faUser;
  readonly faExpand = faChevronRight;
  readonly faHamburguer = faBars;

  toggleShowDropdown() {
    this.showDropdown.update((prevValue) => !prevValue);
  }
}
