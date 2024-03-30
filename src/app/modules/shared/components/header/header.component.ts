import { Component, inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  readonly loggedIn = this.authService.loggedIn;
}
