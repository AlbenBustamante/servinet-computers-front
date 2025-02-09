import { Component, Input } from '@angular/core';
import { ICashRegisterDetailReportsDto } from '@models/cash-register.model';

@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  styleUrls: ['./header-stats.component.css'],
})
export class HeaderStatsComponent {
  @Input({ required: true }) reports!:
    | ICashRegisterDetailReportsDto
    | undefined;
}
