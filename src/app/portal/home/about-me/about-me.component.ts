import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
})
export class AboutMeComponent {
  readonly loggedIn;

  constructor(private readonly authService: AuthService) {
    this.loggedIn = this.authService.loggedIn;
  }
}
