import { Component, signal } from '@angular/core';
import {
  faBoxArchive,
  faChartLine,
  faHome,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { IRoute } from '@models/route.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  private readonly faHome = faHome;
  private readonly faDashboard = faChartLine;
  private readonly faAdministration = faScrewdriverWrench;
  private readonly faMovimientos = faBoxArchive;
  readonly routes = signal<IRoute[]>([]);

  constructor() {
    this.routes.set([
      { title: 'Inicio', icon: this.faHome, route: './home' },
      { title: 'Panel', icon: this.faDashboard, route: './panel' },
      {
        title: 'Administración',
        icon: this.faAdministration,
        route: './administracion',
      },
      {
        title: 'Movimientos',
        icon: this.faMovimientos,
        route: './movimientos',
      },
    ]);
  }
}
