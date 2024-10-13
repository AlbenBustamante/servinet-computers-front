import { Component } from '@angular/core';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css'],
})
export class HomeNavComponent {
  readonly routes = [
    { route: './transacciones', name: 'Transacciones' },
    { route: './gastos', name: 'Gastos' },
    { route: './transferencias', name: 'Transferencias' },
  ];
}
