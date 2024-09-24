import { Component, inject } from '@angular/core';
import {
  faChevronDown,
  faComputer,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  readonly loggedIn = this.authService.loggedIn;
  readonly faComputer = faComputer;
  readonly faAccount = faUser;
  readonly faExpand = faChevronDown;
}
