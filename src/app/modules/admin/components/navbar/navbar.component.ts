import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRoute } from 'src/app/core/models/route.model';
import { IUserRes } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: IUserRes | null = null;
  routes: IRoute[];
  @Input() selectedRoute!: number;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.routes = [
      { title: 'Panel', icon: 'dashboard', route: '../dashboard' },
      { title: 'Plataformas', icon: 'lists', route: '../platforms' },
      { title: 'Sedes', icon: 'holiday_village', route: '../campuses' },
    ];
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((res) => (this.user = res));
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/admin/login'),
    });
  }
}
