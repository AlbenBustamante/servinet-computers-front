import { Component } from '@angular/core';
import { IRoute } from '@models/route.model';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css'],
})
export class BalancesComponent {
  routes: IRoute[] = [
    {
      icon: 'account_balance',
      title: 'Saldos',
      route: '/balances',
    },
  ];
}
