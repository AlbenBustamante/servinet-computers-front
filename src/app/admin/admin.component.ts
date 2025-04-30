import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.authService.getLoggedIn().subscribe();
  }
}
