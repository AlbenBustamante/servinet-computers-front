import { Component, Input } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';

@Component({
  selector: 'app-my-main-stats-header',
  templateUrl: './my-main-stats-header.component.html',
  styleUrls: ['./my-main-stats-header.component.css'],
})
export class MyMainStatsHeaderComponent {
  @Input({ required: true }) cashRegisterDetail!:
    | ICashRegisterDetailRes
    | undefined;
}
