import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatus } from '@models/request-status.model';
import { IRoute } from '@models/route.model';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  routes: IRoute[];
  logoutStatus: RequestStatus = 'init';

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {
    this.routes = [
      { title: 'Inicio', icon: 'home', route: './home' },
      // { title: 'Transferencias', route: './transfers' },
      { title: 'Saldos', icon: 'account_balance', route: './balances' },
      { title: 'Reportes', icon: 'lab_profile', route: './reports' },
    ];
  }

  clickHandler(index: number) {
    this.routes.forEach((route, i) => (route.selected = index === i));
  }

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
