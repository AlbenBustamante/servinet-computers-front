import { Component, signal } from '@angular/core';
import {
  faChartLine,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { IRoute } from '@models/route.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  private readonly faDashboard = faChartLine;
  private readonly faAdministration = faScrewdriverWrench;
  readonly showNavBar = signal<boolean>(false);

  readonly routes: IRoute[] = [
    { title: 'Panel', icon: this.faDashboard, route: './panel' },
    {
      title: 'Administración',
      icon: this.faAdministration,
      route: './administracion',
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
