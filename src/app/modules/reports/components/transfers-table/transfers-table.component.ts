import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { SortDirection } from 'src/app/core/models/enums';
import { IDateRange } from 'src/app/core/models/pagination.model';
import { ITransferRes } from 'src/app/core/models/transfer.model';
import { CampusService } from 'src/app/core/services/campus.service';
import { DateRangeService } from 'src/app/core/services/date-range.service';

@Component({
  selector: 'app-transfers-table',
  templateUrl: './transfers-table.component.html',
  styleUrls: ['./transfers-table.component.css'],
})
export class TransfersTableComponent {
  transfers!: ITransferRes[];
  dateRange: IDateRange = {};

  constructor(
    private readonly campusService: CampusService,
    private readonly dateRangeService: DateRangeService
  ) {
    this.campusService
      .getTransfers(1, {})
      .subscribe((res) => (this.transfers = res.data.results));

    this.dateRangeService.currentDateRange$.subscribe((dateRange) => {
      this.dateRange = dateRange;

      this.campusService
        .getTransfers(1, {
          startDate: this.dateRange.startDate,
          endDate: this.dateRange.endDate,
        })
        .subscribe((res) => (this.transfers = res.data.results));
    });
  }
}
