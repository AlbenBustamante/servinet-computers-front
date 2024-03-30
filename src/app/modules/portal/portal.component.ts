import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'],
})
export class PortalComponent {
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.authService.getLoggedIn().subscribe((res) => console.log(res));
  }
}
