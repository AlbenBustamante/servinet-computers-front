import { Component, signal } from '@angular/core';
import {
  faCashRegister,
  faChartLine,
  faList,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { IRoute } from '@models/route.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  private readonly faDashboard = faChartLine;
  private readonly faPlatforms = faList;
  private readonly faCashRegister = faCashRegister;
  private readonly faUsers = faUser;
  readonly routes = signal<IRoute[]>([]);

  constructor() {
    this.routes.set([
      { title: 'Panel', icon: this.faDashboard, route: './panel' },
      { title: 'Plataformas', icon: this.faPlatforms, route: './plataformas' },
      { title: 'Cajas', icon: this.faCashRegister, route: './cajas' },
      { title: 'Usuarios', icon: this.faUsers, route: './usuarios' },
    ]);
  }
}
