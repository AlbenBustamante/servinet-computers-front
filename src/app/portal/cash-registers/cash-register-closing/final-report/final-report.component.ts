import { Component } from '@angular/core';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-final-report',
  templateUrl: './final-report.component.html',
  styleUrls: ['./final-report.component.css'],
})
export class FinalReportComponent {
  readonly reports;

  constructor(private readonly myCashService: MyCashService) {
    this.reports = this.myCashService.myClosedCashRegisterReports;
  }

  finish() {
    this.myCashService.removeClosedReports();
    this.myCashService.currentCashRegister.set(undefined);
    this.myCashService.myCashRegisters.set(undefined);
    this.myCashService.cashRegisterStatus.set('selecting');
  }
}
