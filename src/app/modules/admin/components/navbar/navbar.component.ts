import { Component, OnInit, signal } from '@angular/core';
import { IRoute } from '@models/route.model';
import { IUserRes } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: IUserRes | null = null;
  routes = signal<IRoute[]>([]);

  constructor(private readonly authService: AuthService) {
    this.routes.set([
      { title: 'Panel', icon: 'dashboard', route: './dashboard' },
      { title: 'Plataformas', icon: 'lists', route: './platforms' },
      { title: 'Sedes', icon: 'holiday_village', route: './campuses' },
    ]);
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((res) => (this.user = res));
  }
}
