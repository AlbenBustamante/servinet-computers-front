import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBars,
  faChevronRight,
  faLaptop,
  faSignOut,
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
  readonly faLogout = faSignOut;

  constructor(private readonly router: Router) {}

  toggleShowDropdown() {
    this.showDropdown.update((prevValue) => !prevValue);
  }

  logout() {
    this.authService.logout();
    // this.tokenService.remove();
    this.router.navigateByUrl('/auth/login');
  }
}
