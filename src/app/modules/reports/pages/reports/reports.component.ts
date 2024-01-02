import { Component } from '@angular/core';
import { IRoute } from 'src/app/core/models/route.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent {
  routes: IRoute[] = [
    {
      icon: 'lists',
      title: 'Reportes',
      route: '/reports',
    },
  ];
}
