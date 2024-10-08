import { Component, signal } from '@angular/core';
import {
  faCashRegister,
  faChartSimple,
  faHome,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { IRoute } from '@models/route.model';

@Component({
  selector: 'app-portal-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  private readonly faHome = faHome;
  private readonly faMyCash = faCashRegister;
  private readonly faList = faList;
  private readonly faReports = faChartSimple;
  readonly routes = signal<IRoute[]>([]);

  constructor() {
    this.routes.set([
      { title: 'Inicio', icon: this.faHome, route: './home' },
      { title: 'Mi caja', icon: this.faMyCash, route: './my-cash' },
      // { title: 'Transferencias', route: './transfers' },
      { title: 'Plataformas', icon: this.faList, route: './platforms' },
      { title: 'Reportes', icon: this.faReports, route: './reports' },
    ]);
  }
}
