import { Component } from '@angular/core';
import {
  faCashRegister,
  faList,
  faChartSimple,
  faBriefcase,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { IRoute } from '@models/route.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'],
})
export class PortalComponent {
  private readonly faHome = faHome;
  private readonly faPortal = faBriefcase;
  private readonly faMyCash = faCashRegister;
  private readonly faList = faList;
  private readonly faReports = faChartSimple;

  readonly routes: IRoute[] = [
    { title: 'Inicio', icon: this.faHome, route: './home' },
    { title: 'Trabajo', icon: this.faPortal, route: './trabajo' },
    { title: 'Mis cajas', icon: this.faMyCash, route: './cajas' },
    { title: 'Plataformas', icon: this.faList, route: './plataformas' },
    { title: 'Reportes', icon: this.faReports, route: './reportes' },
  ];

  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.authService.getLoggedIn().subscribe();
  }
}
