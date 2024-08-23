import { Component, signal } from '@angular/core';
import { RequestStatus } from '@models/request-status.model';
import { IRoute } from '@models/route.model';

@Component({
  selector: 'app-portal-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  routes = signal<IRoute[]>([]);
  logoutStatus: RequestStatus = 'init';

  constructor() {
    this.routes.set([
      { title: 'Inicio', icon: 'home', route: './home' },
      { title: 'Mi caja', route: './my-cash' },
      // { title: 'Transferencias', route: './transfers' },
      { title: 'Plataformas', icon: 'lists', route: './platforms' },
      { title: 'Reportes', icon: 'lab_profile', route: './reports' },
    ]);
  }
}
