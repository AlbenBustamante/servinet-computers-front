import { Component, Input, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatus } from '@models/request-status.model';
import { IRoute } from '@models/route.model';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  @Input({ required: true }) routes!: WritableSignal<IRoute[]>;
  logoutStatus: RequestStatus = 'init';

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  logout() {
    this.logoutStatus = 'loading';

    this.authService.logout().subscribe({
      next: () => {
        this.logoutStatus = 'success';
        this.router.navigateByUrl('/portal/login');
      },
      error: () => {
        this.logoutStatus = 'failed';
        this.tokenService.remove();
        this.router.navigateByUrl('/portal/login');
      },
    });
  }
}
