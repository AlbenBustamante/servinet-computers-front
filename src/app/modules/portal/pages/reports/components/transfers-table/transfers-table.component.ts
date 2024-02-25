import { Component } from '@angular/core';
import { IDateRange } from '@models/pagination.model';
import { RequestStatus } from '@models/request-status.model';
import { ITransferRes } from '@models/transfer.model';
import { CampusService } from '@services/campus.service';
import { DateRangeService } from '@services/date-range.service';

@Component({
  selector: 'app-transfers-table',
  templateUrl: './transfers-table.component.html',
  styleUrls: ['./transfers-table.component.css'],
})
export class TransfersTableComponent {
  transfers!: ITransferRes[];
  transfersStatus: RequestStatus = 'loading';
  dateRange: IDateRange = {};

  constructor(
    private readonly campusService: CampusService,
    private readonly dateRangeService: DateRangeService
  ) {
    this.campusService.getTransfers({}).subscribe({
      next: (res) => {
        this.transfersStatus = 'success';
        this.transfers = res.data.results;
      },
      error: (error) => {
        this.transfersStatus = 'failed';
      },
    });

    this.dateRangeService.currentDateRange$.subscribe((dateRange) => {
      this.dateRange = dateRange;

      this.transfersStatus = 'loading';

      this.campusService
        .getTransfers({
          startDate: this.dateRange.startDate,
          endDate: this.dateRange.endDate,
        })
        .subscribe({
          next: (res) => {
            this.transfersStatus = 'success';
            this.transfers = res.data.results;
          },
          error: (error) => {
            this.transfersStatus = 'failed';
          },
        });
    });
  }
}
