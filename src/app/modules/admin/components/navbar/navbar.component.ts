import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatus } from '@models/request-status.model';
import { IRoute } from '@models/route.model';
import { IUserRes } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: IUserRes | null = null;
  routes: IRoute[];
  logoutStatus: RequestStatus = 'init';
  @Input() selectedRoute!: number;

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {
    this.routes = [
      { title: 'Panel', icon: 'dashboard', route: './dashboard' },
      { title: 'Plataformas', icon: 'lists', route: './platforms' },
      { title: 'Sedes', icon: 'holiday_village', route: './campuses' },
    ];
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((res) => (this.user = res));
  }

  logout() {
    this.logoutStatus = 'loading';

    this.authService.logout().subscribe({
      next: () => {
        this.logoutStatus = 'success';
        this.router.navigateByUrl('/admin/login');
      },
      error: () => {
        this.logoutStatus = 'failed';
        this.tokenService.remove();
        this.router.navigateByUrl('/admin/login');
      },
    });
  }
}
