import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IRoute } from 'src/app/core/models/route.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  routes: IRoute[];

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {
    this.routes = [
      { title: 'Inicio', icon: 'home', route: '/home' },
      { title: 'Reportes', icon: 'lists', route: '/reports' },
    ];
  }

  clickHandler(index: number) {
    this.routes.forEach((route, i) => (route.selected = index === i));
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/portal');
      },
      error: () => {
        this.tokenService.remove();
        this.router.navigateByUrl('/portal');
      },
    });
  }
}
