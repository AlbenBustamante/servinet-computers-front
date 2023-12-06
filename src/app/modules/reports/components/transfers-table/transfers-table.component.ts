import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { SortDirection } from 'src/app/core/models/enums';
import { ITransferRes } from 'src/app/core/models/transfer.model';
import { CampusService } from 'src/app/core/services/campus.service';

@Component({
  selector: 'app-transfers-table',
  templateUrl: './transfers-table.component.html',
  styleUrls: ['./transfers-table.component.css'],
})
export class TransfersTableComponent {
  transfers!: ITransferRes[];

  constructor(private readonly campusService: CampusService) {
    this.campusService
      .getTransfers(1, {
        size: 10,
        page: 1,
        direction: SortDirection.ASC,
        property: 'createdAt',
        startDate: new Date(),
        endDate: new Date(),
      })
      .subscribe((res) => (this.transfers = res.data.results));
  }
}
