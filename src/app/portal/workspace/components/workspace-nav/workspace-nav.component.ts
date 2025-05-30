import { Component } from '@angular/core';
import {
  faBank,
  faMoneyBillTransfer,
  faPiggyBank,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-workspace-nav',
  templateUrl: './workspace-nav.component.html',
})
export class WorkspaceNavComponent {
  readonly routes = [
    {
      route: './transacciones',
      name: 'Transacciones',
      icon: faReceipt,
    },
    {
      route: './gastos',
      name: 'Gastos',
      icon: faPiggyBank,
    },
    {
      route: './transferencias',
      name: 'Transferencias',
      icon: faMoneyBillTransfer,
    },
    {
      route: './depositos-bancarios',
      name: 'Bancos',
      icon: faBank,
    },
  ];
}
