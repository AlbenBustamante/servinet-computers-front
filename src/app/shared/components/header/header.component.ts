import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  faBars,
  faChevronDown,
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
  readonly loggedIn = this.authService.loggedIn;
  readonly faComputer = faLaptop;
  readonly faAccount = faUser;
  readonly faExpand = faChevronDown;
  readonly faHamburguer = faBars;
}
