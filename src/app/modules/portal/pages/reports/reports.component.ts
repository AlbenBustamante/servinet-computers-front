import { Component } from '@angular/core';
import { IRoute } from '@models/route.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent {
  routes: IRoute[] = [
    {
      icon: 'lab_profile',
      title: 'Reportes',
      route: '/reports',
    },
  ];
}
