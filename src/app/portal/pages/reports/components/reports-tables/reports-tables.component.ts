import { Component, Input } from '@angular/core';
import { IReportsRes } from '@models/user.model';
import { SelectedReport } from '../../reports.component';

@Component({
  selector: 'app-reports-tables',
  templateUrl: './reports-tables.component.html',
  styleUrls: ['./reports-tables.component.css'],
})
export class ReportsTablesComponent {
  @Input({ required: true }) reports!: IReportsRes | undefined;
  @Input({ required: true }) selectedReport!: SelectedReport | undefined;
}
