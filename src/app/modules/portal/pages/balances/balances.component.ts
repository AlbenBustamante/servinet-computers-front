import { Component, OnInit } from '@angular/core';
import { IBalanceRes } from '@models/balance.model';
import { RequestStatus } from '@models/request-status.model';
import { CampusService } from '@services/campus.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css'],
})
export class BalancesComponent implements OnInit {
  balances: IBalanceRes[] = [];
  balancesStatus: RequestStatus = 'init';

  constructor(private readonly campusService: CampusService) {}

  ngOnInit(): void {
    this.balancesStatus = 'loading';

    this.campusService.getBalances().subscribe({
      next: (res) => {
        this.balances = res.data.results;
        this.balancesStatus = 'success';
      },
      error: () => {
        this.balancesStatus = 'failed';
      },
    });
  }
}
