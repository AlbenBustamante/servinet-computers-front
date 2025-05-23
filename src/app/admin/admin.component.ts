import { Component, signal } from '@angular/core';
import {
  faHome,
  faChartLine,
  faScrewdriverWrench,
  faBoxArchive,
} from '@fortawesome/free-solid-svg-icons';
import { IRoute } from '@models/route.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  private readonly faHome = faHome;
  private readonly faDashboard = faChartLine;
  private readonly faAdministration = faScrewdriverWrench;
  private readonly faMovimientos = faBoxArchive;
  readonly showNavBar = signal<boolean>(false);

  readonly routes: IRoute[] = [
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
  ];

  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.authService.getLoggedIn().subscribe();
  }

  toggleShowNavBar() {
    this.showNavBar.update((prevValue) => !prevValue);
  }
}
