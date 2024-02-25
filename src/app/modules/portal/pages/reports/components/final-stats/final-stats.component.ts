import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IPageResponse } from '@models/response.model';
import { ITransferRes } from '@models/transfer.model';
import { CampusService } from '@services/campus.service';
import { DateRangeService } from '@services/date-range.service';

@Component({
  selector: 'app-final-stats',
  templateUrl: './final-stats.component.html',
  styleUrls: ['./final-stats.component.css'],
})
export class FinalStatsComponent implements OnInit {
  transfersAmount: number = 0;
  total: string = '0';

  constructor(
    private readonly dateRangeService: DateRangeService,
    private readonly campusService: CampusService
  ) {}

  ngOnInit(): void {
    this.campusService
      .getTransfers({})
      .subscribe((res) => this.calculateTotal(res));

    this.dateRangeService.currentDateRange$.subscribe((res) =>
      this.campusService
        .getTransfers({
          startDate: res.startDate,
          endDate: res.endDate,
        })
        .subscribe((res) => this.calculateTotal(res))
    );
  }

  private calculateTotal(res: IPageResponse<ITransferRes>) {
    this.transfersAmount = res.data.totalElements;
    let total = 0;

    res.data.results.forEach((transfer) => {
      // 150.000
      const fullValue = transfer.value.replaceAll('.', '');

      total += Number(fullValue);
    });

    this.total = formatNumber(total, 'es-CO');
  }
}
