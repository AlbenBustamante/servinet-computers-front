import { Component, signal } from '@angular/core';
import { RequestStatus } from '@models/request-status.model';
import { IRoute } from '@models/route.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  routes = signal<IRoute[]>([]);
  logoutStatus: RequestStatus = 'init';

  constructor() {
    this.routes.set([
      { title: 'Inicio', icon: 'home', route: './home' },
      // { title: 'Transferencias', route: './transfers' },
      { title: 'Saldos', icon: 'account_balance', route: './balances' },
      { title: 'Reportes', icon: 'lab_profile', route: './reports' },
    ]);
  }
}
