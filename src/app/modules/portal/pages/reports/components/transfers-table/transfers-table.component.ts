import { Component, inject } from '@angular/core';
import { CampusService } from '@services/campus.service';

@Component({
  selector: 'app-transfers-table',
  templateUrl: './transfers-table.component.html',
  styleUrls: ['./transfers-table.component.css'],
})
export class TransfersTableComponent {
  private readonly campusService = inject(CampusService);
  readonly transfers = this.campusService.transfers;

  constructor() {}
}
