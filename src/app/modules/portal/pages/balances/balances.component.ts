import { Component, OnInit } from '@angular/core';
import { IPlatformRes } from '@models/platform.model';
import { IRoute } from '@models/route.model';
import { CampusService } from '@services/campus.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css'],
})
export class BalancesComponent implements OnInit {
  platforms: IPlatformRes[] = [];

  constructor(private readonly campusService: CampusService) {}

  ngOnInit(): void {
    this.campusService.platforms$.subscribe({
      next: (res) => {
        this.platforms = res;
      },
    });
  }
}
