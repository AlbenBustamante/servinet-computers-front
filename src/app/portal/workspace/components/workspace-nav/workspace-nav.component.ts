import { Component } from '@angular/core';

@Component({
  selector: 'app-workspace-nav',
  templateUrl: './workspace-nav.component.html',
  styleUrls: ['./workspace-nav.component.css'],
})
export class WorkspaceNavComponent {
  readonly routes = [
    { route: './transacciones', name: 'Transacciones' },
    { route: './gastos', name: 'Gastos' },
    { route: './transferencias', name: 'Transferencias' },
    { route: './depositos-bancarios', name: 'Bancos' },
  ];
}
