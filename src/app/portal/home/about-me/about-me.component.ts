import { Component, computed } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
})
export class AboutMeComponent {
  readonly loggedIn;
  readonly fullName = computed(
    () => `${this.loggedIn()?.name} ${this.loggedIn()?.lastName}`
  );

  constructor(private readonly authService: AuthService) {
    this.loggedIn = this.authService.loggedIn;
  }
}
