import { Component, signal } from '@angular/core';
import { IRoute } from '@models/route.model';
import { IUserRes } from '@models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: IUserRes | null = null;
  routes = signal<IRoute[]>([]);

  constructor() {
    this.routes.set([
      { title: 'Panel', icon: 'dashboard', route: './dashboard' },
      { title: 'Plataformas', icon: 'lists', route: './platforms' },
      { title: 'Sedes', icon: 'holiday_village', route: './campuses' },
    ]);
  }
}
