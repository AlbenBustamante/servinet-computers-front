import { Component } from '@angular/core';
import { IRoute } from '@models/route.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  routes: IRoute[] = [
    {
      route: '/',
      icon: 'home',
      title: 'Inicio',
    },
  ];
}
